import styled from "styled-components";
import GlobalStyles from "./styles/GlobalStyles";
import Button from "./ui/Button";
import Input from "./ui/Inpur";

const H1 = styled.h1`
  font-size: 30px;
  font-weight: 600;
  background-color: yellow;
`;

const StyledApp = styled.div`
  background-color: orangered;
  padding: 20px;
`;

function App() {
  return (
    <>
      <GlobalStyles />
      <StyledApp>
        <H1>Wild Oasis</H1>
        <Button>Check In</Button>
        <Button>Check Out</Button>
        <Input type="number" placeholder="Numberr of Guests" />
      </StyledApp>
    </>
  );
}

export default App;
