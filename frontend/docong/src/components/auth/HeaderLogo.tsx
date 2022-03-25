import styled from 'styled-components'

const Header = styled.div`
  display: flex;
  justify-content: center;
  align-items: end;
  padding-bottom: 3vh;
  height: ${({ size }: { size: any }) => size};
`

const LogoImage = styled.img`
  height: 130px;
`

function HeaderLogo({ size }: { size: any }) {
  return (
    <Header size={size}>
      <LogoImage alt="Docong Logo" src="/images/Docong_Logo.png" />
    </Header>
  )
}

export default HeaderLogo
