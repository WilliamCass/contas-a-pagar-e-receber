const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let contasPagar = [];
let contasReceber = [];

function exibirMenu(menuAtual) {
  console.clear();

  if (menuAtual === "principal") {
    console.log("\n==== MENU PRINCIPAL ====");
    console.log("1 - Adicionar Registro Contas a Pagar");
    console.log("2 - Adicionar Registro Contas a Receber");
    console.log("3 - Visualizar Registros");
    console.log("4 - Sair");
    console.log("=======================");
  }

  rl.question("\nEscolha uma opção: ", (opcao) => {
    switch (opcao) {
      case "1":
        adicionarRegistro("pagar");
        break;
      case "2":
        adicionarRegistro("receber");
        break;
      case "3":
        visualizarRegistrosMenu();
        break;
      case "4":
        console.log("\nSaindo...");
        rl.close();
        break;
      default:
        console.log("\nOpção inválida. Tente novamente.");
        setTimeout(() => exibirMenu("principal"), 1500);
        break;
    }
  });
}

function adicionarRegistro(tipo) {
  console.clear();
  console.log(`\n=== Adicionar Registro - Contas a ${tipo === "pagar" ? "Pagar" : "Receber"} ===`);

  rl.question("Nome: ", (nome) => {
    rl.question("Data (DD-MM-YYYY): ", (data) => {
      rl.question("Valor: ", (valor) => {
        let valorNumerico = parseFloat(valor);
        if (isNaN(valorNumerico) || valorNumerico <= 0) {
          console.log("\n⚠️ Valor inválido. Digite um número positivo.");
          return setTimeout(() => adicionarRegistro(tipo), 1500);
        }

        let registro = { nome, data, valor: valorNumerico };

        if (tipo === "pagar") {
          rl.question("Status (Pendente/Pago): ", (status) => {
            status = status.trim().toLowerCase();
            if (!["pendente", "pago"].includes(status)) {
              console.log("\n⚠️ Status inválido. Digite: Pendente ou Pago.");
              return setTimeout(() => adicionarRegistro(tipo), 1500);
            }
            registro.status = status.charAt(0).toUpperCase() + status.slice(1);
            contasPagar.push(registro);
            console.log("\n✅ Registro adicionado com sucesso!");
            rl.question("\nPressione Enter para voltar ao menu...", () => exibirMenu("principal"));
          });
        } else {
          contasReceber.push(registro);
          console.log("\n✅ Registro adicionado com sucesso!");
          rl.question("\nPressione Enter para voltar ao menu...", () => exibirMenu("principal"));
        }
      });
    });
  });
}

function visualizarRegistrosMenu() {
  console.clear();
  console.log("\n==== Visualizar Registros ====");
  console.log("1 - Contas a Pagar");
  console.log("2 - Contas a Receber");
  console.log("3 - Total Geral de Contas");
  console.log("4 - Voltar");
  console.log("============================");

  rl.question("\nEscolha uma opção: ", (opcao) => {
    switch (opcao) {
      case "1":
        visualizarContasPagar();
        break;
      case "2":
        visualizarContasReceber();
        break;
      case "3":
        visualizarTotalGeral();
        break;
      case "4":
        exibirMenu("principal");
        break;
      default:
        console.log("\nOpção inválida. Tente novamente.");
        setTimeout(() => visualizarRegistrosMenu(), 1500);
        break;
    }
  });
}

function visualizarContasPagar() {
  console.clear();
  console.log("\n=== Contas a Pagar ===");
  let total = 0;
  if (contasPagar.length === 0) {
    console.log("Nenhuma conta a pagar encontrada.");
  } else {
    contasPagar.forEach((registro, index) => {
      console.log(`\nRegistro ${index + 1}:`);
      console.log(`Nome: ${registro.nome}`);
      console.log(`Data: ${registro.data}`);
      console.log(`Valor: ${registro.valor.toFixed(2)}`);
      console.log(`Status: ${registro.status}`);
      console.log("----------------------");
      total += registro.valor;
    });
    console.log(`\nTotal Contas a Pagar: R$ ${total.toFixed(2)}`);
  }
  rl.question("\nPressione Enter para voltar...", () => visualizarRegistrosMenu());
}

function visualizarContasReceber() {
  console.clear();
  console.log("\n=== Contas a Receber ===");
  let total = 0;
  if (contasReceber.length === 0) {
    console.log("Nenhuma conta a receber encontrada.");
  } else {
    contasReceber.forEach((registro, index) => {
      console.log(`\nRegistro ${index + 1}:`);
      console.log(`Nome: ${registro.nome}`);
      console.log(`Data: ${registro.data}`);
      console.log(`Valor: ${registro.valor.toFixed(2)}`);
      console.log("----------------------");
      total += registro.valor;
    });
    console.log(`\nTotal Contas a Receber: R$ ${total.toFixed(2)}`);
  }
  rl.question("\nPressione Enter para voltar...", () => visualizarRegistrosMenu());
}

function visualizarTotalGeral() {
  console.clear();
  let totalPagar = contasPagar.reduce((acc, cur) => acc + cur.valor, 0);
  let totalReceber = contasReceber.reduce((acc, cur) => acc + cur.valor, 0);
  let totalGeral = totalReceber - totalPagar;
  console.log("\n=== Total Geral de Contas ===");
  console.log(`Total Contas a Pagar: R$ ${totalPagar.toFixed(2)}`);
  console.log(`Total Contas a Receber: R$ ${totalReceber.toFixed(2)}`);
  console.log(`Total Geral: R$ ${totalGeral.toFixed(2)}`);
  rl.question("\nPressione Enter para voltar...", () => visualizarRegistrosMenu());
}

exibirMenu("principal");
