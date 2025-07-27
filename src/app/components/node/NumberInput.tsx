'use client'
import { Handle, Node, NodeProps, Position, useReactFlow } from '@xyflow/react'
import React, { useCallback, useState } from 'react'

type NumberNodeData = {
    value: number,
    label: string,
    onDeleteNode: (id : number |string) => void
}

type NumberNode = Node<NumberNodeData>;

const NumberInput = ({ id, data }: NodeProps<NumberNode>) => {

    const { updateNodeData } = useReactFlow()
    const [number, setNumber] = useState<number>(data.value)

    const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const cappedNumber = Math.min(255, Math.max(0, parseInt(e.target.value)))
        setNumber(cappedNumber)
        updateNodeData(id, { value: cappedNumber })
    }, [])

    return (
        <div className="h-[5rem] border border-[#eee] p-5 rounded-md bg-white">
            <div className='flex flex-col'>
                <label htmlFor="text">{data.label}</label>
                <input
                    id={`number-${id}`}
                    name="number"
                    type='number'
                    min={0}
                    max={255}
                    onChange={onChange}
                    className="nodrag"
                    value={number}
                />
                <button onClick={() => data.onDeleteNode(id)} style={{position: 'absolute', height: 20, width: 40, background: 'blue', color: '#ffffff', cursor: 'pointer'}}>delete</button>
            </div>
            <Handle type='source' position={Position.Right} />
        </div>
    )
}

export default NumberInput
