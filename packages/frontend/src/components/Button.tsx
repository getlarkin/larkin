import styled from 'styled-components'

type ButtonVariant = 'primary' | 'default' | 'danger'

interface Props {
  variant?: ButtonVariant
  fullWidth?: boolean
}

function getButtonColor(variant: ButtonVariant = 'primary') {
  switch (variant) {
    case 'default':
      return '#888'
    case 'primary':
    case 'danger':
    default:
      return '#FFF'
  }
}

function getButtonBGColor(variant: ButtonVariant = 'primary') {
  switch (variant) {
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
  background: ${props => getButtonBGColor(props.variant)};
  color: ${props => getButtonColor(props.variant)};
  max-width: ${props => (props.fullWidth ? '100%' : '200px')};
  display: ${props => (props.fullWidth ? 'inline-block' : 'inline')};
  &[disabled] {
    background: #ccc;
    color: #666;
  }
`
