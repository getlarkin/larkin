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
  width: 800px;
  display: flex;
  align-items: center;
`

const TextFieldContainer = styled.div`
  margin-left: 12px;
  flex: 1;
`

interface Props {
  open: boolean
  onClose: () => void
  onLaunch: () => void
}

interface State {
  image: string
  launching: boolean
}

export class LaunchModal extends React.Component<Props, State> {
  state = {
    image: '',
    launching: false,
  }

  setImage = (e: any) => this.setState({ image: e.target.value })

  launch = async () => {
    this.setState({ launching: true })
    await launchContainer(this.state.image)
    this.setState({ launching: false })
    this.props.onLaunch()
  }

  render() {
    const { open, onClose } = this.props
    const { image, launching } = this.state

    return (
      <Dialog open={open} onClose={onClose} maxWidth="lg">
        <DialogTitle>Docker Run</DialogTitle>
        <DialogContent>
          <DialogContentText>Launch a container by just filling docker image.</DialogContentText>
          <FormArea>
            $ docker run
            <TextFieldContainer>
              <TextField
                fullWidth
                placeholder="nginx:latest"
                value={image}
                onChange={this.setImage}
              />
            </TextFieldContainer>
          </FormArea>
        </DialogContent>
        <DialogActions>
          <Button disabled={launching} onClick={this.launch}>
            {launching ? 'launching...' : 'Launch'}
          </Button>
        </DialogActions>
      </Dialog>
    )
  }
}
