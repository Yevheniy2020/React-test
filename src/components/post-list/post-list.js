import React from 'react';

import PostListItem from '../post-list-item'
import './post-list.css'


const PostList = ({posts, onDeleted , onToggleImportant, onToggleLiked}) =>{


   
    const elements = posts.filter(item => typeof item === 'object' && item.constructor.name !== "Array" && Object.keys(item).length !== 0)
    .map(item =>{

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
                onToggleImportant = {()=> onToggleImportant(id)}
                onToggleLiked = {()=> onToggleLiked(id)}
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