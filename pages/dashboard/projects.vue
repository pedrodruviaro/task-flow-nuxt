<script setup lang="ts">
// const projects = [
//   {
//     title: "Desenvolvimento de Aplicativo de Compras Online",
//     description:
//       "Este projeto envolve o desenvolvimento de um aplicativo de compras online que permitirá aos usuários navegar por uma ampla variedade de produtos e efetuar compras de forma rápida e segura.",
//     due_date: new Date("2024-03-10").toISOString(),
//     owner: "João",
//     categories: ["Web Development", "Mobile App"],
//     status: "active",
//     allocated: [],
//   },
//   {
//     title: "Análise de Dados de Vendas Trimestrais",
//     description:
//       "Neste projeto, faremos uma análise abrangente dos dados de vendas trimestrais para identificar tendências, padrões de compra e oportunidades de melhoria no desempenho das vendas.",
//     due_date: new Date("2024-03-15").toISOString(),
//     owner: "João",
//     categories: ["Data Science"],
//     status: "on_hold",
//     allocated: [],
//   },
//   {
//     title: "Campanha de Marketing de Lançamento",
//     description:
//       "Este projeto se concentra na criação e implementação de uma campanha de marketing abrangente para o lançamento de um novo produto no mercado. Iremos desenvolver estratégias de marketing digital, publicidade e relações públicas.",
//     due_date: new Date("2024-03-20").toISOString(),
//     owner: "João",
//     categories: ["Marketing"],
//     status: "completed",
//     allocated: [],
//   },
//   {
//     title: "Redesign da Interface do Usuário",
//     description:
//       "Neste projeto, estaremos redesenhando a interface do usuário de nossa plataforma existente para melhorar a usabilidade, a experiência do usuário e a estética geral.",
//     due_date: new Date("2024-03-25").toISOString(),
//     owner: "João",
//     categories: ["Design"],
//     status: "active",
//     allocated: [],
//   },
//   {
//     title: "Desenvolvimento de Aplicativo de Gerenciamento de Tarefas",
//     description:
//       "O objetivo deste projeto é criar um aplicativo de gerenciamento de tarefas intuitivo e eficiente que permita aos usuários organizar suas tarefas diárias, atribuir prioridades e acompanhar o progresso.",
//     due_date: new Date("2024-03-05").toISOString(),
//     owner: "João",
//     categories: ["Mobile App", "Web Development"],
//     status: "on_hold",
//     allocated: [],
//   },
//   {
//     title: "Estratégias de Marketing de Conteúdo",
//     description:
//       "Neste projeto, estaremos desenvolvendo e implementando estratégias de marketing de conteúdo para aumentar o reconhecimento da marca, atrair tráfego qualificado para o site e gerar leads.",
//     due_date: new Date("2024-03-12").toISOString(),
//     owner: "João",
//     categories: ["Marketing", "Web Development"],
//     status: "completed",
//     allocated: [],
//   },
//   {
//     title: "Design de Interface para Aplicativo de Fitness",
//     description:
//       "Este projeto envolve o design de uma interface de usuário moderna e atraente para um aplicativo de fitness que permitirá aos usuários acompanhar seu progresso, definir metas e acessar treinos personalizados.",
//     due_date: new Date("2024-03-18").toISOString(),
//     owner: "João",
//     categories: ["Design", "Mobile App"],
//     status: "active",
//     allocated: [],
//   },
//   {
//     title: "Análise de Dados de Usuários",
//     description:
//       "Neste projeto, iremos realizar uma análise detalhada dos dados dos usuários para entender melhor seu comportamento, preferências e necessidades, a fim de informar decisões estratégicas de negócios.",
//     due_date: new Date("2024-03-22").toISOString(),
//     owner: "João",
//     categories: ["Data Science"],
//     status: "on_hold",
//     allocated: [],
//   },
//   {
//     title: "Desenvolvimento de Site Institucional",
//     description:
//       "Este projeto consiste no desenvolvimento de um site institucional para uma empresa com o objetivo de fornecer informações relevantes sobre seus produtos, serviços e valores corporativos.",
//     due_date: new Date("2024-03-28").toISOString(),
//     owner: "João",
//     categories: ["Web Development", "Design"],
//     status: "completed",
//     allocated: [],
//   },
//   {
//     title: "Aplicativo de Receitas Culinárias",
//     description:
//       "Neste projeto, estaremos desenvolvendo um aplicativo de receitas culinárias que permitirá aos usuários explorar uma ampla variedade de receitas, criar listas de compras e compartilhar suas próprias criações.",
//     due_date: new Date("2024-03-03").toISOString(),
//     owner: "João",
//     categories: ["Mobile App", "Design"],
//     status: "active",
//     allocated: [],
//   },
// ]

const projects = ref([])
</script>

<template>
  <section>
    <div class="flex items-center gap-2 mb-4 flex-wrap">
      <UButton variant="outline" color="gray">All Projects (100)</UButton>
      <UButton variant="ghost" color="gray">In Progress (70)</UButton>
      <UButton variant="ghost" color="gray">On Hold (0)</UButton>
      <UButton variant="ghost" color="gray">Completed (30)</UButton>
    </div>

    <div
      class="grid gap-8 md:grid-cols-2 xl:grid-cols-3"
      v-if="projects && projects.length > 0"
    >
      <UCard
        v-for="project in projects"
        :key="project.title"
        class="grid grid-rows-[max-content_1fr_max-content]"
      >
        <template #header>
          <div class="flex items-start gap-2 justify-between">
            <h2 class="font-semibold text-slate-500">{{ project.title }}</h2>
            <UButton
              variant="ghost"
              icon="i-heroicons-ellipsis-vertical-20-solid"
            />
          </div>
        </template>

        <template #default>
          <div
            class="grid gap-4 grid-rows-[1fr_max-content_max-content] h-full"
          >
            <p class="text-sm">{{ project.description }}</p>
            <div class="flex flex-wrap gap-2">
              <UBadge
                color="blue"
                v-for="category in project.categories"
                :key="category"
                >{{ category }}</UBadge
              >
            </div>

            <UMeter
              :value="35"
              indicator
              icon="i-heroicons-chart-bar"
              label="Completed"
            />
          </div>
        </template>

        <template #footer>
          <div class="flex justify-end">
            <UBadge variant="soft"
              ><strong>Due Date:</strong>{{ project.due_date }}</UBadge
            >
          </div>
        </template>
      </UCard>
    </div>
  </section>
</template>
