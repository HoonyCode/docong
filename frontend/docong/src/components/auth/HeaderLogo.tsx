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
  cursor: pointer;
`

interface HeaderLogoProps {
  size: string
  setIsOpenCheckToLogin: any
}

function HeaderLogo({ size, setIsOpenCheckToLogin }: HeaderLogoProps) {
  return (
    <Header size={size}>
      <LogoImage
        alt="Docong Logo"
        src="/images/Docong_Logo.png"
        onClick={() =>
          setIsOpenCheckToLogin ? setIsOpenCheckToLogin(true) : null
        }
      />
    </Header>
  )
}

export default HeaderLogo
