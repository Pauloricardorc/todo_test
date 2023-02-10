import { api } from "@/services/axios/api";
import { Plus, Trash, UserCircleGear } from "phosphor-react";
import { FormEvent, useEffect, useState } from "react";
import { Container, Content, Divider, Loading } from "./styles";

interface IPosts {
  id: number;
  title: string;
  author: string;
}

interface ISubmitPost {
  e: FormEvent;
  id: number | string;
}

export default function Home() {
  const [todos, setTodos] = useState<IPosts[]>([]);
  const [notify, setNotify] = useState(false);
  const [post, setPost] = useState("");
  const [author, setAuthor] = useState("");
  const [loading, setLoading] = useState(false);

  const Notify = async () => {
    setNotify(true);
    await new Promise((f) => setTimeout(() => setNotify(false), 1000));
  };

  useEffect(() => {
    async function getAllTodos() {
      const result = await api.get("/posts").then((res) => res.data);
      setTodos(result);
    }
    getAllTodos();
  }, []);

  async function handleAddPost(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    await api
      .post("posts", {
        author,
        title: post,
      })
      .then((result) => {
        setTodos([...todos, result.data]);
        setPost("");
        setAuthor("");
        setLoading(false);
      });
  }

  async function handleDeletePost(id: number) {
    setTodos(todos.filter((res) => res.id !== id));

    await api.delete(`posts/${id}`);
  }

  return (
    <Container notification={notify}>
      <Content>
        <h1>Todo</h1>
        <header>
          <form
            onSubmit={handleAddPost}
            style={{ display: "flex", width: "100%" }}
          >
            <input
              type="text"
              placeholder="Nome"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              disabled={loading}
              minLength={3}
              required
            />
            <input
              type="text"
              placeholder="Nova tarefa"
              value={post}
              onChange={(e) => setPost(e.target.value)}
              disabled={loading}
              minLength={1}
              required
            />
            <button
              type="submit"
              className="button-notification"
              onClick={Notify}
              disabled={loading}
            >
              <Plus size={24} />
            </button>
          </form>
        </header>
        <main>
          {todos.length !== 0 ? (
            <>
              {todos.map((todo) => (
                <div key={todo.id} className="container-todo">
                  <div
                    style={{
                      display: "flex",
                      gap: "0.8rem",
                      alignItems: "center",
                    }}
                  >
                    <UserCircleGear
                      weight="duotone"
                      size={32}
                      className="avatar"
                    />
                    <Divider />
                    <div className="todo-items">
                      <p>{todo.author}</p>
                      <span>{todo.title}</span>
                    </div>
                  </div>
                  <div>
                    <button
                      className="trash"
                      onClick={() => handleDeletePost(todo.id)}
                    >
                      <Trash size={24} />
                    </button>
                  </div>
                </div>
              ))}
            </>
          ) : (
            <Loading />
          )}
        </main>
      </Content>
    </Container>
  );
}
