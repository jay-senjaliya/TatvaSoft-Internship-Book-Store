import React from 'react'
import Title from './Title';
import './../App.css';

export default function List() {
    const listArr = [{
        title: 'Title 1',
        description: 'Description 1',
        id: 1
    },
    {
        title: 'Title 2',
        description: 'Description 2',
        id: 2
    },
    {
        title: 'Title 3',
        description: 'Description 3',
        id: 3
    },
    {
        title: 'Title 4',
        description: 'Description 4',
        id: 4
    },
    {
        title: 'Title 5',
        description: 'Description 5',
        id: 5
    }];
    return (
        <div>
            <div className='container cards row'>
                {listArr.map(e => {
                    return <Title key={e.title} title={e.title} description={e.description} id={e.id} />
                })}
            </div>

        </div>
    )
}
