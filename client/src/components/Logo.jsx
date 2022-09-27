import React, {Component} from 'react'
import styled from 'styled-components'

import logo from '../logo.svg'

const Wraper = styled.a.attrs({
    className: 'navbar-brand'
})``

class Logo extends Component {
    render ()
    {
        return (
            <Wraper href = "https://sambarros.com">
                <img src={logo} width="50" height="50" alt="sambarros.com" />
            </Wraper>
        )
    }
}

export default Logo