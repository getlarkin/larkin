import styled from 'styled-components'

type ButtonType = 'primary' | 'default' | 'danger'

interface Props {
  type?: ButtonType
  fullWidth?: boolean
}

function getButtonColor(type: ButtonType = 'primary') {
  switch (type) {
    case 'default':
      return '#888'
    case 'primary':
    case 'danger':
    default:
      return '#FFF'
  }
}

function getButtonBGColor(type: ButtonType = 'primary') {
  switch (type) {
    case 'primary':
      return '#707ded'
    case 'danger':
      return '#ED7070'
    case 'default':
    default:
      return '#F8F8F8'
  }
}

export const Button = styled.button<Props>`
  padding: 8px 22px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  border: none;
  background: ${props => getButtonBGColor(props.type)};
  color: ${props => getButtonColor(props.type)};
  max-width: ${props => (props.fullWidth ? '100%' : '200px')};
  display: ${props => (props.fullWidth ? 'inline-block' : 'inline')};
  &[disabled] {
    background: #ccc;
    color: #666;
  }
`
