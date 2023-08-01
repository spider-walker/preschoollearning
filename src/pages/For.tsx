import React from 'react'

interface TabBarProps<T> {
    items: T[];
    onTabClick: (item: T, selectedIndex: number) => void
  }

  export const For=<T extends {id: number,name: string}>(props: TabBarProps<T>): JSX.Element=> {
    return (

        <div>
            <h1>For</h1>
            {props.items.map((item,index)=>(
                <div key={item?.id}>
                    {item?.name}
                </div>
            ))}
            <button onClick={()=>props.onTabClick(props.items[0],0)}>Click</button>
        </div>
    )
}
    
export function getLatest(index = messages.items.length - 1) {
    return messages.items[index]
  }
  
  const messages = {
    items: [
      { message: 'Simple test message', from: 'Testman' },
      // ...
    ],
    getLatest, // can also be a `getter or setter if supported`
  }