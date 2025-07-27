'use client'
import { Handle, Node, NodeProps, Position, useNodeConnections, useNodesData } from '@xyflow/react'
import React from 'react'



type ColorType = {
    r: number | unknown,
    g: number | unknown,
    b: number | unknown
}

type ColorPreviewData = {
    label: string
}

type NumberNode = Node<ColorPreviewData>

const ColorPreview = ({id, data} : NodeProps<NumberNode>) => {
    const redConnection = useNodeConnections({
        handleType: 'target',
        handleId: 'red'
    })

    console.log(redConnection?.[0])

    const redNodeData = useNodesData(
        redConnection?.[0].source,
    )
    const greenConnection = useNodeConnections({
        handleType: 'target',
        handleId: 'green'
    })

    const greenNodeData = useNodesData(
        greenConnection?.[0].source,
    )
    const blueConnection = useNodeConnections({
        handleType: 'target',
        handleId: 'blue'
    })

    const blueNodeData = useNodesData(
        blueConnection?.[0].source,
    )



    const color: ColorType = {
        r: redNodeData?.data.value || 0,
        g: greenNodeData?.data.value || 0,
        b: blueNodeData?.data.value || 0, 
    }

    console.log(color.r)

    return (
        <div style={{background: `rgb(${color.r},${color.g},${color.b})`, width:200, height: 200, borderRadius: '10px', padding: '1rem'}}>
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
