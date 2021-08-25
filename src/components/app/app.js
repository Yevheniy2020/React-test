import React, {Component} from 'react';
import AppHeader from '../app-header/app-header';
import SearchPanel from '../search-panel';
import PostStatusFilter from '../post-status-filter';
import PostList from '../post-list'
import PostAddForm from '../post-add-form';

import nextId from "react-id-generator";

import './app.css'




const lowerLetters = 'qwertyuioplkjhgfdsazxcvbnm',
    number = '1234567890';

function createRandomSymbol(){

    let pasArr = [];

    pasArr.push(lowerLetters[Math.floor(Math.random() * lowerLetters.length)]);
    pasArr.push(number[Math.floor(Math.random() * number.length)]);

    return pasArr[Math.floor(Math.random() * pasArr.length)];
}

function generateRandomId(){

    const counter = 5;
    let randId = '';
   
    for(let i = 0 ; i < counter; i++){
        const item = createRandomSymbol();
        randId += item;
    }
    return randId;

    
}



// console.log(generateRandomId());


export default class App extends Component{

    constructor(props){
        
        super(props);

        this.state = {
            data: [
                //we need id for adding new item
                //айди нужно для  производительности
                //реакт смотрит на айди и айди которые новые он обновляет, а старые не трогает
                
                {label:'Going to learn React' , important: true, like: false, id:generateRandomId()},
                [],
                {label:'Going to learn JS' , important: false, like: false, id:generateRandomId()},
                1,
                {},
                {label:'Going to learn English' , important: false, like: false, id:generateRandomId()}
            ],
            term: '',
            filter: 'all'
        };

        this.deleteItem = this.deleteItem.bind(this);
        this.addItem = this.addItem.bind(this);

        this.onToggleImportant = this.onToggleImportant.bind(this);
        this.onToggleLiked = this.onToggleLiked.bind(this);

        this.onUpdateSearch = this.onUpdateSearch.bind(this);
        this.onFilterSelect = this.onFilterSelect.bind(this);
        
        // this.maxId = 4;
    }


    changeStateItem(id,item){

        this.setState(({data})=>{

            const index = data.findIndex(elem  => elem.id === id),
            old = data[index],
            newItem = {...old, [item]: !old[item]},
            newArr = [...data.slice(0 , index),newItem , ...data.slice(index + 1)];

            return{
                data:newArr
            }


        });

    }


    onToggleImportant(id){
       
        this.changeStateItem(id, "important");
    }

    onToggleLiked(id){
        
        this.changeStateItem(id, "like");
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
        id: generateRandomId()
       }

       this.setState(({data})=>{
           const newArr = [...data, newItem];
           return{
            data: newArr
           }
       })

    }

    searchPost(items, term) {
        if (term.length === 0) {
            return items
        }

        return items.filter(item => {
            return typeof item === 'object' && item.constructor.name !== "Array" && Object.keys(item).length !== 0 &&  item.label.indexOf(term) > -1
        })
    }
    
    filterPost(items, filter){

        if(filter === 'like'){
            return items.filter(item => item.like);
        }else{
            return items       
        }


    }

    onUpdateSearch(term){
        this.setState({term});
    }

    onFilterSelect(filter){
        this.setState({filter});
    }


    render(){

        const {data,term,filter} = this.state;
        const liked = data.filter(item => item.like ).length;
        const allPosts = data.filter(item => typeof item === 'object' && item.constructor.name !== "Array" && Object.keys(item).length !== 0).length;

        const visiblePosts = this.filterPost(this.searchPost(data, term), filter);



        // const liked = this.state.data.filter(ite)

        return(
            <div className = 'app'>
                <AppHeader
                liked = {liked}
                allPosts = {allPosts} 
                />
                <div className='search-panel d-flex'>
                    <SearchPanel
                    onUpdateSearch={this.onUpdateSearch}/>
                    <PostStatusFilter
                    filter={filter}
                    onFilterSelect={this.onFilterSelect}/>
                </div>
                <PostList 
                posts = {visiblePosts}
                onDeleted= {this.deleteItem}
                onToggleImportant = {this.onToggleImportant}
                onToggleLiked = {this.onToggleLiked}
                />
                <PostAddForm
                onAdd={this.addItem} />
            </div>
        );
    }

    
    
}

