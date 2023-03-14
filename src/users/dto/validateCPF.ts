import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';

@ValidatorConstraint({ name: 'CPF', async: false })
export class ValidateCPF implements ValidatorConstraintInterface {
  validate(text: string, args: ValidationArguments) {
    // return text.length === 11; // for async validations you must return a Promise<boolean> here
    return TestaCPF(text);

    function TestaCPF(strCPF) {
        var Soma;
        var Resto;
        Soma = 0;

      if (typeof strCPF !== 'string') return false;
      if (strCPF == "00000000000") return false;
    
      for (let i=1; i<=9; i++) Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (11 - i);
      Resto = (Soma * 10) % 11;
    
        if ((Resto == 10) || (Resto == 11))  Resto = 0;
        if (Resto != parseInt(strCPF.substring(9, 10)) ) return false;
    
      Soma = 0;
        for (let i = 1; i <= 10; i++) Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (12 - i);
        Resto = (Soma * 10) % 11;
    
        if ((Resto == 10) || (Resto == 11))  Resto = 0;
        if (Resto != parseInt(strCPF.substring(10, 11) ) ) return false;
        return true;
    }
  }

  defaultMessage(args: ValidationArguments) {
    // here you can provide default error message if validation failed
    return 'CPF Inválido!';
  }
}