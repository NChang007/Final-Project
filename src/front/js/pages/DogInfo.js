import React, {useContext} from 'react'
import { Context } from '../store/appContext'
import {useParams} from "react-router-dom"
import "../../styles/DogInfo.css"
function DogInfo() {
    const {store, actions} = useContext(Context)
    let params = useParams()
    const dog = store.breeds.find(item =>{
        if (item.id == params.id){
            return item
        }
    })
    console.log(dog)
  return (
    <div className='container'>
        <div className='dogInfoContainer'>
           <div className='title'><h1>{dog.breedName}</h1></div> 
            <div className='infoContainerImage'>
            <img src={dog.image} alt={dog.breedName}/>
                <div className='mx-auto'>                  
                    <p>Weight: {dog.dogInfo.weight}</p>
                    <p>Height: {dog.dogInfo.height}</p>
                    <p>Life Span: {dog.dogInfo.life}</p>
                    <p>Group: {dog.dogInfo.breedGroup}</p>
                    
                </div>
            </div>
            <p className='dIDescription'>Description: {dog.description}</p>
        </div>
    </div>
  )
}

export default DogInfo