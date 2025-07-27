'use client'
import { Handle, Node, NodeProps, Position, useEdges, useNodeConnections, useNodeId, useNodesData } from '@xyflow/react'
import React, { useMemo } from 'react'

type ColorType = {
    r: number | unknown,
    g: number | unknown,
    b: number | unknown
}

type ColorPreviewData = {
    label: string
}

type NumberNode = Node<ColorPreviewData>

const ColorPreview = ({ id, data }: NodeProps<NumberNode>) => {
    const allEdges = useEdges()

    const sourceNodeIds = useMemo(() => {
        const ids = allEdges
            .filter((edges) => edges.target === id)
            .map((edge) => edge.source)
        return ids
    }, [id, allEdges])

    const sourceNodeData = useNodesData(sourceNodeIds)

    const color =
        useMemo(() => {
            const findValueByHandle = (id: string) => {
                const value = sourceNodeData.find((node) => node.id === id)?.data.value

                if (typeof value !== 'number' || value < 0) {
                    return 0
                }

                return value
            }
            return {
                r: findValueByHandle('red'),
                g: findValueByHandle('green'),
                b: findValueByHandle('blue')
            }
        }, [allEdges, id])


    return (
        <div style={{ background: `rgb(${color.r},${color.g},${color.b})`, width: 200, height: 200, borderRadius: '10px', padding: '1rem' }}>
            <h3>{data.label}</h3>
            <div>
                <Handle type='target' position={Position.Left} id='red' />
                <label htmlFor="red">R</label>
            </div>
            <div>
                <Handle type='target' position={Position.Left} id='green' />
                <label htmlFor="green">G</label>
            </div>
            <div>
                <Handle type='target' position={Position.Left} id='blue' />
                <label htmlFor="blue">B</label>
            </div>
        </div>
    )
}

export default ColorPreview
