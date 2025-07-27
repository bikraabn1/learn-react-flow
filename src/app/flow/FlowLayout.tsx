'use client'
import { Background, Controls, Edge, EdgeChange, MiniMap, Node, NodeChange, ReactFlow, SelectionMode, addEdge, applyEdgeChanges, applyNodeChanges } from '@xyflow/react'
import React, { useCallback, useState } from 'react'
import NumberInput from '../components/node/NumberInput'
import ColorPreview from '../components/node/ColorPreview'

const nodeTypes = {
    numberInput: NumberInput,
    colorPreview: ColorPreview
}

const rfStyle = {
    backgroundColor: '#B8CEFF',
};

const FlowLayout = () => {
    const onDeleteNode = (id : number | string) => {
        setNodes(nodes.filter(node => node.id !== id))
    }

    const initialNodes: Node[] = [
        {
            id: '1',
            position: { x: 100, y: 100 },
            data: { label: 'Red', value: 200, onDeleteNode: onDeleteNode },
            type: 'numberInput'
        },
        {
            id: '2',
            position: { x: 100, y: 200 },
            data: { label: 'Green', value: 255, onDeleteNode: onDeleteNode },
            type: 'numberInput'

        },
        {
            id: '3',
            position: { x: 100, y: 300 },
            data: { label: 'Blue', value: 255, onDeleteNode: onDeleteNode },
            type: 'numberInput'
        },
        {
            id: 'color',
            position: { x: 300, y: 150 },
            data: { label: 'Preview Color' },
            type: 'colorPreview'
        },
    ]

    const initialEdges: Edge[] = [
        {
            id: '1-color',
            source: '1',
            target: 'color',
            targetHandle: 'red',
        },
        {
            id: '2-color',
            source: '2',
            target: 'color',
            targetHandle: 'green',
        },
        {
            id: '3-color',
            source: '3',
            target: 'color',
            targetHandle: 'blue',
        },
    ]

    const [nodes, setNodes] = useState(initialNodes)
    const [edges, setEdges] = useState(initialEdges)

    const onNodesChanges = useCallback((changes: NodeChange<Node>[]) => {
        setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot))
    }, [])

    const onEdgesChanges = useCallback((changes: EdgeChange<Edge>[]) => {
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
                panOnDrag={true}
                panOnScroll={true}
                selectionMode={SelectionMode.Partial}
                style={rfStyle}
                nodeTypes={nodeTypes}
            >
                <MiniMap nodeStrokeWidth={3} zoomable pannable />
                <Background />
                <Controls />
            </ReactFlow>
        </div>
    )
}

export default FlowLayout
