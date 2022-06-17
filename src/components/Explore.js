import React from 'react'
import { Routes, Route, useParams } from 'react-router-dom';
import ExploreDiv from './ExploreDiv';
import Header from './Header';

export default function Explore() {
    let { id } = useParams();
    console.log("id",id)
  return (
    <div>
        <Header noLinks={true} />
        <ExploreDiv tokenId={id}/>
    </div>
  )
}
