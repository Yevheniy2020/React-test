import React from 'react';

import PostListItem from '../post-list-item'
import './post-list.css'


const PostList = ({posts, onDeleted}) =>{

    const elements = posts.map(item =>{

        //id = id
        //itemProps = all value without id
        const {id,...itemProps} = item; 
    
        return(
            <>
            <li key={id} className ="list-group-item">
                <PostListItem 
                // label={item.label}
                // important = {item.important}
                //or
                {...itemProps}
                onDelete={()=>onDeleted(id)}
                />
            </li>
            </>
        )
    })

    return(
        <ul className= 'app-list  list-group'> 
          {elements}
        </ul>
    )

}

export default PostList;