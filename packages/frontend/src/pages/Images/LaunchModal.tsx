import * as React from 'react'
import styled from 'styled-components'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import { Button } from '@larkin/frontend/components/Button'
import { TextField } from '@larkin/frontend/components/TextField'
import { launchContainer } from '@larkin/frontend/services/api'

const FormArea = styled.div`
  margin-top: 24px;
`

const TextFieldContainer = styled.span`
  margin-left: 12px;
`

interface Props {
  open: boolean
  onClose: () => void
  onLaunch: () => void
}

interface State {
  image: string
}

export class LaunchModal extends React.Component<Props, State> {
  state = {
    image: '',
  }

  setImage = (e: any) => this.setState({ image: e.target.value })

  launch = async () => {
    await launchContainer(this.state.image)
    this.props.onLaunch()
  }

  render() {
    const { open, onClose } = this.props
    const { image } = this.state

    return (
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Docker Run</DialogTitle>
        <DialogContent>
          <DialogContentText>Launch a container by just filling docker image.</DialogContentText>
          <FormArea>
            $ docker run
            <TextFieldContainer>
              <TextField placeholder="nginx:latest" value={image} onChange={this.setImage} />
            </TextFieldContainer>
          </FormArea>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.launch}>Launch</Button>
        </DialogActions>
      </Dialog>
    )
  }
}
