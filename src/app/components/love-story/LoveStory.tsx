'use client'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import styles from './LoveStory.module.scss'

export default function LoveStory() {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return (
      <section className={styles.loveStorySection}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>
            Nossa História Completa
          </h2>
          
          <div className={styles.storyContent}>
            <div className={styles.storyText}>
              <p>
                Tudo começou em uma festa junina na escola Minuano, quando Eduarda tinha 12 anos e Fernando 13. 
                Foi ali que rolou o primeiro beijo, mas a vida acabou separando os dois por um tempo.
              </p>
              
              <p>
                Alguns anos depois, as redes sociais entraram em cena. Pelo Facebook e mensagens de texto — inclusive 
                usando o famoso "código secreto" para mandar SMS de graça —, os dois voltaram a se aproximar. Foram 
                juntos a algumas festas e até namoraram por 15 dias, mas a vida seguiu caminhos diferentes.
              </p>
              
              <p>
                O destino, porém, parecia insistir. Anos depois, se reencontraram no mesmo colégio onde tudo havia 
                começado, agora no EJA. A amizade se fortaleceu tanto que até professores brincavam que eles deveriam 
                ficar juntos. Com o incentivo de uma amiga em comum e trocas divertidas (como "um enroladinho por um 
                selinho"), foram construindo uma conexão única, mesmo em meio a outros relacionamentos.
              </p>
              
              <p>
                Em dezembro de 2014, Fernando levou Eduarda ao Itapema Park com sua família e amigos. Ali já havia 
                sinais de algo especial, com direito até à promessa de um tio que dizia que, se ficassem juntos, 
                ganhariam uma casa na praia. Pouco tempo depois, em janeiro de 2015, em uma viagem à praia com os 
                pais dele, o destino finalmente cumpriu seu papel: no dia 14, em uma barraca, com o incentivo de um 
                amigo em comum durante uma ligação, Fernando pediu Eduarda em namoro. Ela aceitou — e naquele instante 
                a vida deles mudou para sempre.
              </p>
              
              <p>
                Menos de um mês depois, veio a surpresa das alianças: escondidas dentro da bolsa de Eduarda, 
                disfarçadas em meio ao cartão de ônibus, logo após um culto jovem. Foi o primeiro gesto concreto 
                de uma vida de compromissos que só cresceria.
              </p>
              
              <p>
                Com o apoio da família e amigos, Eduarda encontrou acolhimento e novas oportunidades de trabalho e 
                estudo. Moraram juntos com os pais dele até conquistarem o primeiro apartamento. Vieram também as 
                primeiras vitórias: o ensino médio completo, a moto, o carro, os pets — e, com o tempo, a família 
                cresceu para três gatos e um cachorro (Soap, Bento, Noah e Donna).
              </p>
              
              <p>
                Hoje, já são 10 anos de amor, amizade e cumplicidade. Somam vários afilhados, conquistas pessoais 
                e profissionais, e uma empresa em crescimento construída lado a lado. Uma história de superação, 
                sonhos e planos — porque sabem que juntos podem ir ainda mais longe.
              </p>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className={styles.loveStorySection}>
      <motion.div 
        className={styles.container}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <motion.h2 
          className={styles.sectionTitle}
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          Nossa História Completa
        </motion.h2>
        
        <motion.div 
          className={styles.storyContent}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          <motion.div 
            className={styles.storyText}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.6 }}
            >
              Tudo começou em uma festa junina na escola Minuano, quando Eduarda tinha 12 anos e Fernando 13. 
              Foi ali que rolou o primeiro beijo, mas a vida acabou separando os dois por um tempo.
            </motion.p>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              Alguns anos depois, as redes sociais entraram em cena. Pelo Facebook e mensagens de texto — inclusive 
              usando o famoso "código secreto" para mandar SMS de graça —, os dois voltaram a se aproximar. Foram 
              juntos a algumas festas e até namoraram por 15 dias, mas a vida seguiu caminhos diferentes.
            </motion.p>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              O destino, porém, parecia insistir. Anos depois, se reencontraram no mesmo colégio onde tudo havia 
              começado, agora no EJA. A amizade se fortaleceu tanto que até professores brincavam que eles deveriam 
              ficar juntos. Com o incentivo de uma amiga em comum e trocas divertidas (como "um enroladinho por um 
              selinho"), foram construindo uma conexão única, mesmo em meio a outros relacionamentos.
            </motion.p>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              Em dezembro de 2014, Fernando levou Eduarda ao Itapema Park com sua família e amigos. Ali já havia 
              sinais de algo especial, com direito até à promessa de um tio que dizia que, se ficassem juntos, 
              ganhariam uma casa na praia. Pouco tempo depois, em janeiro de 2015, em uma viagem à praia com os 
              pais dele, o destino finalmente cumpriu seu papel: no dia 14, em uma barraca, com o incentivo de um 
              amigo em comum durante uma ligação, Fernando pediu Eduarda em namoro. Ela aceitou — e naquele instante 
              a vida deles mudou para sempre.
            </motion.p>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              Menos de um mês depois, veio a surpresa das alianças: escondidas dentro da bolsa de Eduarda, 
              disfarçadas em meio ao cartão de ônibus, logo após um culto jovem. Foi o primeiro gesto concreto 
              de uma vida de compromissos que só cresceria.
            </motion.p>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              Com o apoio da família e amigos, Eduarda encontrou acolhimento e novas oportunidades de trabalho e 
              estudo. Moraram juntos com os pais dele até conquistarem o primeiro apartamento. Vieram também as 
              primeiras vitórias: o ensino médio completo, a moto, o carro, os pets — e, com o tempo, a família 
              cresceu para três gatos e um cachorro (Soap, Bento, Noah e Donna).
            </motion.p>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7, duration: 0.6 }}
            >
              Hoje, já são 10 anos de amor, amizade e cumplicidade. Somam vários afilhados, conquistas pessoais 
              e profissionais, e uma empresa em crescimento construída lado a lado. Uma história de superação, 
              sonhos e planos — porque sabem que juntos podem ir ainda mais longe.
            </motion.p>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  )
}
