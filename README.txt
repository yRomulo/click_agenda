projeto voltado para construção de um algoritmo de marcação de agenda onde o administrador do sistema vai conseguir visualizar 
todas as alocaçoes de horario assim como relatorios de meses anteriores e o usuario vai conseguir ver os horarios disponiveis e fazer uma
alocação se quiser.
Esse algoritmo ira servir para ser uma base para sistemas que irao utilizar dessa logica, como um site de agendamento de horarios para um 
barbeiro, manicure ou similares.

Objetivos gerais do sistema:
-tela de loguin e registro com email(válido), password e jwt assim como as atribuições de usuario e admin. Sendo que a criação de usuario na tela de loguin
sera exclusivamente para usuario padrao e nao admin
- boas praticas e componentização
- estruturação de pastas bem organizada
- middlewares
-migrations


front-end:
- desing moderno e enxuto
- contruido em algum framework recomendado como o next
-codigo minimalista, ou seja, apenas com o necessário para o funcionamento, sem muitas verificações extras
- totalmente objetivo e mandando as reposabilidades direto para o backend


back-end:
- backend vai ter todas as responsabilidade diminuindo as possibilidades de vunerabilidade de sistema onde o front "expoe" informações 
importantes (inaceitável)


parametros liberados por mim:
-se for necessario algum framework extra para o funcionamento ESSENCIAL, pode ser instalado
- pode realizar as açoes no terminal e criar as pastas