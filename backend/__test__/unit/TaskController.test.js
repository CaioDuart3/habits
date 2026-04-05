const { TaskController } = require("../../src/controllers/TaskController");

// Mock do TaskService - simula o comportamento do serviço
const mockTaskService = {
  getAllTasks: jest.fn(),
  createTask: jest.fn()
};

// Descreve a suíte de testes para o TaskController
describe("TaskController", () => {
  let taskController;
  
  // Setup - executa antes de cada teste
  beforeEach(() => {
    // Limpa os mocks antes de cada teste (boa prática importante)
    jest.clearAllMocks();
    
    // Cria uma nova instância do controller com o mock injetado
    taskController = new TaskController(mockTaskService);
  });

  // ============================================
  // TESTES DO MÉTODO CREATE
  // ============================================
  describe("Método create()", () => {
    
    it("Deve criar uma tarefa com sucesso", async () => {
      // ARRANGE (Preparar) - setup dos dados de entrada
      const taskData = {
        title: "Minha Tarefa",
        description: "Descrição da tarefa",
        status: "pending"
      };

      // Mock retorna um objeto completo com ID
      const taskCreated = {
        id: 1,
        ...taskData,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      
      mockTaskService.createTask.mockResolvedValue(taskCreated);

      // Mock do objeto request (entrada do HTTP)
      const req = {
        body: taskData
      };

      // Mock do objeto response (saída do HTTP)
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis()
      };

      // ACT (Agir) - executa a função testada
      await taskController.create(req, res);

      // ASSERT (Verificar) - valida o resultado
      expect(mockTaskService.createTask).toHaveBeenCalledWith(
        expect.objectContaining({
          title: "Minha Tarefa",
          description: "Descrição da tarefa",
          status: "pending"
        })
      );
      
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(taskCreated);
    });

    it("Deve retornar erro 400 se título estiver vazio", async () => {
      // ARRANGE
      const req = {
        body: {
          title: "", // Título vazio - caso de erro
          description: "Descrição",
          status: "pending"
        }
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis()
      };

      // ACT
      await taskController.create(req, res);

      // ASSERT
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          error: expect.stringContaining("título é obrigatório")
        })
      );
      
      // Garante que o serviço NÃO foi chamado em caso de erro de validação
      expect(mockTaskService.createTask).not.toHaveBeenCalled();
    });

    it("Deve retornar erro 400 se descrição estiver vazia", async () => {
      // ARRANGE
      const req = {
        body: {
          title: "Tarefa",
          description: "  ", // Descrição com apenas espaços
          status: "pending"
        }
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis()
      };

      // ACT
      await taskController.create(req, res);

      // ASSERT
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          error: expect.stringContaining("descrição é obrigatória")
        })
      );
      expect(mockTaskService.createTask).not.toHaveBeenCalled();
    });

    it("Deve retornar erro 400 se status for inválido", async () => {
      // ARRANGE
      const req = {
        body: {
          title: "Tarefa",
          description: "Descrição",
          status: "inválido" // Status não permitido
        }
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis()
      };

      // ACT
      await taskController.create(req, res);

      // ASSERT
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          error: expect.stringContaining("pending, in-progress ou completed")
        })
      );
      expect(mockTaskService.createTask).not.toHaveBeenCalled();
    });
  });

  // ============================================
  // TESTES DO MÉTODO INDEX
  // ============================================
  describe("Método index()", () => {
    
    it("Deve retornar lista de tarefas com sucesso", async () => {
      // ARRANGE
      const tasks = [
        { id: 1, title: "Tarefa 1", description: "Desc 1", status: "pending", createdAt: new Date(), updatedAt: new Date() },
        { id: 2, title: "Tarefa 2", description: "Desc 2", status: "completed", createdAt: new Date(), updatedAt: new Date() }
      ];

      mockTaskService.getAllTasks.mockResolvedValue(tasks);

      const req = {};
      const res = {
        json: jest.fn().mockReturnThis()
      };

      // ACT
      await taskController.index(req, res);

      // ASSERT
      expect(mockTaskService.getAllTasks).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith(tasks);
      expect(res.json).toHaveBeenCalledTimes(1);
    });

    it("Deve retornar lista vazia quando não há tarefas", async () => {
      // ARRANGE
      mockTaskService.getAllTasks.mockResolvedValue([]);

      const req = {};
      const res = {
        json: jest.fn().mockReturnThis()
      };

      // ACT
      await taskController.index(req, res);

      // ASSERT
      expect(res.json).toHaveBeenCalledWith([]);
    });
  });
});
