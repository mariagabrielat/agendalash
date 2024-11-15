import React from 'react'
import './style.css'
import Menu from '../../components/menu'
import Painel from '../../components/painel'

function index() {
  return (
    <div class="admin-container">
                <Menu/>
                <Painel/>
        </div>
  )
}

export default index