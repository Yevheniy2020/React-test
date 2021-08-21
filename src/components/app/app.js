import React, {Component} from 'react';
import AppHeader from '../app-header/app-header';
import SearchPanel from '../search-panel';
import PostStatusFilter from '../post-status-filter';
import PostList from '../post-list'
import PostAddForm from '../post-add-form';

import './app.css'




export default class App extends Component{

    constructor(props){
        
        super(props);

        this.state = {
            data: [
                //we need id for adding new item
                //айди нужно для  происводительности
                //реакт смотрит на айди и айди которые новые он обновляет, а старые не трогает
                {label:'Going to learn React' , important: true, id: 1},
                {label:'Going to learn JS' , important: false, id: 2},
                {label:'Going to learn English' , important: false, id: 3}
            ]
        };

        this.deleteItem = this.deleteItem.bind(this);
        this.addItem = this.addItem.bind(this);

        this.maxId = 4;
    }

    deleteItem(id){
        this.setState(({data})=>{ //take data


                                              //each item    item which we clicked 
            // const index = data.findIndex(elem => elem.id === id); //на каком месте он стоит базе 0 1 2
        
            //slice - новый массив который забераем в данные промижутках
            // (1,2) = 2 / 

            //логика 
            //before  = (0,0) - пустой массив
            //after = (1) - с 1 до количества объектов

            //                         //с нуля до index (0 - 0)
            // const before = data.slice(0,index),
            //                         //с index позиции (1...)
            //     after = data.slice(index + 1),
            //     //новый массив = пусто массив , массив с данными
            //     newArray = [...before, ...after];

            //or

            // const newArray = data.filter((item) => {
            //    if(item.id !== id){
            //     return item
            //    }
            // })
            
            //or

            const newArray = data.filter((item) => item.id !== id);
            
            return{
                data: newArray
            }
        
        });
    }

    addItem(body){

       const newItem = {
        label:body ,
        important: false,
        id: this.maxId++
       }

       this.setState(({data})=>{
           const newArr = [...data, newItem];
           return{
            data: newArr
           }
       })

    }


    render(){
        return(
            <div className = 'app'>
                <AppHeader/>
                <div className='search-panel d-flex'>
                    <SearchPanel/>
                    <PostStatusFilter/>
                </div>
                <PostList 
                posts = {this.state.data}
                onDeleted= {this.deleteItem}/>
                <PostAddForm
                onAdd={this.addItem} />
            </div>
        );
    }

    
    
}

