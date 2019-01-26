import styled from 'styled-components'

interface TextFieldProps {
  fullWidth?: boolean
}

export const TextField = styled.input<TextFieldProps>`
  border-radius: 4px;
  border: none;
  padding: 8px 12px;
  background: #f5f5f5;
  width: ${props => (props.fullWidth ? '100%' : 'auto')}

  ::placeholder {
    color: #aaa;
    opacity: 1;
  }
`
