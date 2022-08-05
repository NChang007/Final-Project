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
    <div className='containerInfoPage'>
        <div className='dogInfoContainer'>
           <div className='titleDogAboutPage'><h1>{dog.breedName}</h1></div> 
            <div className='infoContainerImage'>
            <img src={dog.image} alt={dog.breedName}/>
                <div className='dogDetails'>                  
                    <p><strong>Weight:</strong> {dog.dogInfo.weight}</p>
                    <p><strong>Height:</strong>: {dog.dogInfo.height}</p>
                    <p><strong>Life Span:</strong> {dog.dogInfo.life}</p>
                    <p><strong>Group:</strong>: {dog.dogInfo.breedGroup}</p>
                    
                </div>
            </div>
            <p className='dIDescription'><strong>Description</strong>: {dog.description}</p>
        </div>
    </div>
  )
}

export default DogInfo