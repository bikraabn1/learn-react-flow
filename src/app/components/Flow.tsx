'use client'
import { Background, Controls, ReactFlow, addEdge, applyEdgeChanges, applyNodeChanges } from '@xyflow/react'
import React, { useCallback, useState } from 'react'

const initialNodes = [
    {
        id: 'n1',
        position: { x: 0, y: 0 },
        data: { label: 'Node 1' },
        type: 'input'
    },
    {
        id: 'n2',
        position: { x: 100, y: 100 },
        data: { label: 'Node 2' },
    },
    {
        id: 'n3',
        position: { x: 0, y: 100 },
        data: { label: 'Node 2' },
    },
]

const initialEdges = [
    {
        id: 'n1-n2',
        source: 'n1',
        target: 'n2',
    }
]
const Flow = () => {
    const [nodes, setNodes] = useState(initialNodes)
    const [edges, setEdges] = useState(initialEdges)

    const onNodesChanges = useCallback((changes: any) => {
        setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot))
    }, [])

    const onEdgesChanges = useCallback((changes: any) => {
        setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot))
    }, [])

    const onConnect = useCallback(
        (params: any) => setEdges((edgesSnapshot) => addEdge(params, edgesSnapshot)),
        [],
      );

    return (
        <div style={{ height: '100%', width: '100%' }}>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChanges}
                onEdgesChange={onEdgesChanges}
                onConnect={onConnect}
                fitView
            >
                <Background />
                <Controls />
            </ReactFlow>
        </div>
    )
}

export default Flow
