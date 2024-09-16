import React from 'react';
import './App.css';
import { Button } from './components_i/ui/button'; // Caminho ajustado para o componente Button
import { ReactComponent as PlusIcon } from './assets/icons/PlusIcon.svg'; // Importe o ícone SVG do caminho correto
import { ReactComponent as PlusIconPurple } from './assets/icons/PlusIconPurple.svg'; // Importe o novo ícone SVG como um componente React
import { ReactComponent as GoogleIcon } from './assets/icons/googleIcon.svg'; // Importe o ícone do Google como um componente React
import { Checkbox } from './components_i/ui/Checkbox';
import { Radio } from './components_i/ui/Radio';  // Importe o componente RadioGroup


function App() {
  return (
    <div className="App">
      <br />
      {/* Botão Padrão */}
      <Button onClick={() => alert('Botão padrão clicado!')}>Button</Button>
      <br />
      <br />
      {/* Novo Botão Maior */}
      <Button variant="large" size="large" onClick={() => alert('Botão maior clicado!')}>
        Button
      </Button>
      <br />
      <br />
      {/* Botão Extra Grande */}
      <Button variant="extraLarge" size="extraLarge" onClick={() => alert('Botão extra grande clicado!')}>
        Button
      </Button>
      <br />
      <br />
      <Button

        onClick={() => alert('Botão com ícone clicado!')}
      >
        <PlusIcon className="mr-2 w-4 h-4" /> {/* Ícone adicionado ao lado do texto */}
        Button
      </Button>
      <br />
      <br />
      {/* Botão large com Ícone */}
      <Button
        variant="large"
        size="large"
        onClick={() => alert('Botão com ícone clicado!')}
      >
        <PlusIcon className="mr-2 w-4 h-4" /> {/* Ícone adicionado ao lado do texto */}
        Button
      </Button>
      <br />
      <br />
      {/* Botão extraLarge com Ícone */}
      <Button
        variant="extraLarge"
        size="extraLarge"
        onClick={() => alert('Botão com ícone clicado!')}
      >
        <PlusIcon className="mr-2 w-4 h-4" /> {/* Ícone adicionado ao lado do texto */}
        Button
      </Button>
      <br />
      <br />
      {/* Botão Outline Default */}
      <Button variant="outlineDefault" onClick={() => alert('Botão outline default clicado!')}>
        Button
      </Button>
      <br />
      <br />
      {/* Botão Outline Large */}
      <Button variant="outlineLarge" size="large" onClick={() => alert('Botão outline large clicado!')}>
        Button
      </Button>
      <br />
      <br />
      {/* Botão Outline Extra Grande */}
      <Button variant="outlineExtraLarge" size="extraLarge" onClick={() => alert('Botão outline extra grande clicado!')}>
        Button
      </Button>
      <br />
      <br />
      {/* Botão Default com Ícone Purple */}
      <Button variant="outlineDefault" onClick={() => alert('Botão default com ícone purple clicado!')}>
      <PlusIconPurple className="mr-2 w-4 h-4" /> {/* Ícone Purple adicionado ao lado do texto */}
      Button
      </Button>
      <br />
      <br />
      {/* Botão Large com Ícone Purple */}
      <Button variant="outlineLarge" size="large" onClick={() => alert('Botão large com ícone purple clicado!')}>
      <PlusIconPurple className="mr-2 w-4 h-4" /> {/* Ícone Purple adicionado ao lado do texto */}
        Button
      </Button>
      <br />
      <br />
      {/* Botão Extra Grande com Ícone Purple */}
      <Button variant="outlineExtraLarge" size="extraLarge" onClick={() => alert('Botão extra grande com ícone purple clicado!')}>
      <PlusIconPurple className="mr-2 w-4 h-4" /> {/* Ícone Purple adicionado ao lado do texto */}
       Button
      </Button>
      <br />
      <br/>
      {/* Botão Google */}
      <Button variant="google" size="google" onClick={() => alert('Login com Google clicado!')}>
        <GoogleIcon className="mr-2 w-6 h-6" /> {/* Ícone do Google */}
        Continue with Google
      </Button>
      <br />
      <br />
            {/* Seção de Checkbox, Radio, Toggle */}
      <h2 className="text-center font-bold text-[18px] font-['Plus Jakarta Sans']">Checkbox, Radio, Toggle</h2>
      <div className="flex space-x-4 justify-center mt-4">
        {/* Checkbox */}
        <Checkbox />
        {/* Outras Checkboxes e elementos vão aqui */}
      </div>
            {/* Seção de Checkbox, Radio, Toggle */}
      <h2 className="text-center font-bold text-[18px] font-['Plus Jakarta Sans']">Checkbox, Radio, Toggle</h2>
      <div className="flex space-x-4 justify-center mt-4">
        {/* Botão de Rádio Individual */}
        <Radio value="radio" />
      </div>
      
      <br/>
      <br/>
    </div>
  );
}

export default App;
