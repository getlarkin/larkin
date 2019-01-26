import * as React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  background: #fff;
  border-radius: 3px;
  width: 250px;
  height: 250px;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  border: solid 1px #eee;
`

const Num = styled.div`
  font-size: 48px;
`

const Text = styled.div``

interface Props {
  text: string
  num: number
}

export const Card = ({ text, num }: Props) => (
  <Container>
    <Num>{num}</Num>
    <Text>{text}</Text>
  </Container>
)
