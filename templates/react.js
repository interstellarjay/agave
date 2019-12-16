const TEMPLATE_REACT = `
import React from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'

const %%_CMP_%%Wrapper = styled.div\`
    display: flex;
    flex-direction: row;
    align-content: center;
\`
const %%_CMP_%%Content = styled.div\`
    flex: 1;
\`

interface %%_CMP_%%Props {

}

function %%_CMP_%% (props: %%_CMP_%%Props) {
    const [localVar, setVar] = React.useState({})
    const dispatch = useDispatch()
    return (
        <%%_CMP_%%Wrapper>
            <%%_CMP_%%Content>
                {/* Some content here */}
            </%%_CMP_%%Content>
        </%%_CMP_%%Wrapper>
    )
}
export default %%_CMP_%%
`

module.exports = {
    TEMPLATE_REACT
}