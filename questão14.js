//Emita o resultado de uma pesquisa de opinião pública a respeito das eleições presidenciais. O
//entrevistado deverá escolher entre 3 candidatos (Serra=45, Dilma=13 ou Ciro Gomes=23), ou então
//responder: indeciso=99, outros=98, nulo/branco=0. O algoritmo deve ler a opinião de voto de cada
//entrevistado, encerrando-se a pesquisa com a opinião sendo igual a –1. Ao final, devem ser mostrados:

//· a porcentagem de cada candidato;
//· a porcentagem dos outros candidatos;
//· a porcentagem de eleitores indecisos;
//· a porcentagem de votos nulos/brancos;
//· o total de entrevistados;
//· uma mensagem indicando a possibilidade ou não de haver 2o turno.

import { print, pede_numero } from "../Ajuda/funções.js"

function main() {
    print(`
    =======================
    ELEIÇÕES
    Quando voto for '-1'
    o programa encerra
    =======================
    `)

    // Entrada
    let voto = pede_numero(`
    Digite qual opção de voto você deseja votar:
    ============================================
    45 = Serra
    13 = Dilma
    23 = Ciro Gomes
    99 = Indeciso
    98 = Outros
    0 = Nulo/Branco
    ============================================
    Voto: `)

    // Processamento
    let periodo_de_eleição = eleição(voto)

    // Saída
    if (periodo_de_eleição !== "") {
        print(periodo_de_eleição)
    }
    print("Encerrando Programa...")
}

//Função
function eleição(voto){
    let contador = 0
    let Serra = 0
    let Dilma = 0
    let Ciro = 0
    let indeciso = 0
    let Outros = 0
    let nulo_branco = 0

    while (voto !== -1) {
        contabilizar_votação(voto, Serra, Dilma, Ciro, indeciso, Outros, nulo_branco)
        contador++
        voto = pede_numero("Digite o proximo Voto: ")
    }

    if (contador === 0) {
        return "" // Retorna uma string vazia se nenhum voto for contabilizado
    }

    return analisar_porcentagem(contador, Serra, Dilma, Ciro, indeciso, Outros, nulo_branco)
}

function contabilizar_votação(voto, Serra, Dilma, Ciro, indeciso, Outros, nulo_branco) {
    if (voto === 45) {
        return Serra++
    }
    else if (voto === 13) {
        return Dilma++
    }
    else if (voto === 23) {
        return Ciro++
    }
    else if (voto === 99) {
        return indeciso++
    }
    else if (voto === 98) {
        return Outros++
    }
    else if (voto === 0) {
        return nulo_branco++
    }
}

function analisar_porcentagem(total_de_pessoas_que_votaram, Serra, Dilma, Ciro, Indeciso, Outros, nulo_branco) {
    Serra = (Serra) / total_de_pessoas_que_votaram
    Dilma = (Dilma) / total_de_pessoas_que_votaram
    Ciro = (Ciro) / total_de_pessoas_que_votaram
    Indeciso = (Indeciso) / total_de_pessoas_que_votaram
    Outros = (Outros) / total_de_pessoas_que_votaram
    nulo_branco = (nulo_branco) / total_de_pessoas_que_votaram
    let situacao = verificar_situação(Serra, Dilma, Ciro, Outros)
    let resposta = (`
    =======================================================
    ----------------------------------------
    Porcentagem de Cada Candidato:
    Serra = ${Serra * 100}%
    Dilma = ${Dilma * 100}%
    Ciro = ${Ciro * 100}%
    Outros = ${Outros * 100}%
    ----------------------------------------
    Porcentagem de Votos Não Contabilizados:
    Indecisos = ${Indeciso * 100}%
    Nulo/Branco = ${nulo_branco * 100}%
    Total de Participantes = ${total_de_pessoas_que_votaram}
    ----------------------------------------
    Situação Atual: ${situacao}
    ========================================================`
    )
    return resposta
}

function verificar_situação(Serra, Dilma, Ciro, Outros) {
    if (Serra > Dilma && Serra > Ciro && Serra > 0.51) {
        return `Serra GANHOU! Sem possibilidade de 2º Turno`
    }
    else if (Serra > Dilma && Serra > Ciro) {
        return `Serra GANHOU! Com possibilidade de 2º Turno`
    }
    else if (Dilma > Serra && Dilma > Ciro && Dilma > 0.51) {
        return `Dilma GANHOU! Sem possibilidade de 2º Turno`
    }
    else if (Dilma > Serra && Dilma > Ciro) {
        return `Dilma GANHOU! Com possibilidade de 2º Turno`
    }
    else if (Ciro > Serra && Ciro > Dilma && Ciro > 0.51) {
        return `Ciro GANHOU! Sem possibilidade de 2º Turno`
    }
    else if (Ciro > Serra && Ciro > Dilma) {
        return `Ciro GANHOU! Com possibilidade de 2º Turno`
    }
    else if (Outros > Ciro && Outros > Dilma && Outros > Serra) {
        return `Outro Candidato, fora dos Principais, tem a possibilidade de ter ganhado!`
    }
}
main()
