import { Table, TableBody, TableHead, TableHeader, TableRow, TableCell} from "./components/ui/table"
import { Button } from "./components/ui/button"
import { Input  } from "./components/ui/input" // se o arquivo exporta mais de 1 coisa, é com {}
import api from "./services/api" // se o arquivo exporta 1 coisa, é sem {}
import { useEffect, useState } from "react"
import type { Task } from "./types/Task" //importa a tipagem de Task para usar no frontend, garantindo que os dados estejam corretos e evitando erros de tipo.


function App() {

  // solicitar request
  const [tasks, setTasks] = useState<Task[]>([])

  useEffect(() => {
    api.get("/tasks")
      .then(response => {
        setTasks(response.data)
      })
      .catch(error => {
        console.error("Erro ao buscar tarefas:", error)
      })
  }, [])

  // criar função para criar tarefa
  const[title, setTitle] = useState("")
  const[description, setDescription] = useState("")
  const[status, setStatus] = useState("")

  const handleCriarTarefa = () => {
    api.post("/tasks", {
      title,
      description,
      status
    })
    .then(response => {
      setTasks([...tasks, response.data]) //atualiza a lista de tarefas com a nova tarefa criada
      setTitle("") //limpa os campos de input
      setDescription("")
      setStatus("")
    })
    .catch(error => {
      console.error("Erro ao criar tarefa:", error)
    })
  }
  // renderizar a interface
  return (
    <>
      <Input placeholder="Titulo" value={title} onChange={(e) => setTitle(e.target.value)} />
      <Input placeholder="Descrição" value={description} onChange={(e) => setDescription(e.target.value)} />
      <Input placeholder="Status" value={status} onChange={(e) => setStatus(e.target.value)} />
    
      <Button onClick={handleCriarTarefa}>Criar tarefa</Button>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Titulo</TableHead>
            <TableHead>Descrição</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Última atualização</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {tasks.map((task: any) => (
            <TableRow key={task.id}>
              <TableCell>{task.title}</TableCell>
              <TableCell>{task.description}</TableCell>
              <TableCell>{task.status}</TableCell>
              <TableCell>{new Date(task.updated_at).toLocaleString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>

      </Table>
    </>
  )
}

export default App