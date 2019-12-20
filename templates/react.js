const TEMPLATE_REACT = `
import React from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'

const %%c%%Wrapper = styled.div\`
    display: flex;
    flex-direction: row;
    align-content: center;
\`
const %%c%%Content = styled.div\`
    flex: 1;
\`

interface %%c%%Props {

}

function %%c%% (props: %%c%%Props) {
    const [localVar, setVar] = React.useState({})
    const dispatch = useDispatch()
    return (
        <%%c%%Wrapper>
            <%%c%%Content>
                {/* Some content here */}
            </%%c%%Content>
        </%%c%%Wrapper>
    )
}
export default %%c%%
`

module.exports = {
    TEMPLATE_REACT
}