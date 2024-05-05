import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [id, setId] = useState(null);
  const [ekleName, setEkleName] = useState("");
  const [ekleMail, setEkleMail] = useState("");
  const [degisiklik, setDegisiklik] = useState(false);
  const [Array, setArray] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8080");
        setArray(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [degisiklik]);

  const eklemeFonksiyonu = async () => {
    const response = { name: ekleName, email: ekleMail };
    try {
      await axios.post("http://localhost:8080", response);
      setDegisiklik((prev) => !prev);
    } catch (error) {
      console.log(error);
    }
  };

  const silmeFonksiyonu = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/${id}`);
      setDegisiklik((prev) => !prev);
    } catch (error) {
      console.error("Silme işlemi sırasında bir hata oluştu:", error);
    }
  };

  const duzenlemeFonksiyonu = async (id) => {
    const response = { name: name, email: email };
    try {
      console.log(id);
      console.log(response);
      await axios.put(`http://localhost:8080/${id}`, response);
      setDegisiklik((prev) => !prev);
    } catch (error) {
      console.error("Düzenleme işlemi sırasında bir hata oluştu:", error);
    }
  };

  return (
    <div
      className="App"
      style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
    >
      <div className="ekleme">
        <input
          value={ekleName}
          onChange={(e) => {
            setEkleName(e.target.value);
          }}
          type="text"
          placeholder="İsminiz"
        />
        <input
          value={ekleMail}
          onChange={(e) => {
            setEkleMail(e.target.value);
          }}
          type="text"
          placeholder="Mailiniz"
        />
        <button onClick={eklemeFonksiyonu}>Ekle</button>
      </div>

      <div className="list">
        <button onClick={() => setDegisiklik((prev) => !prev)}>Lİstele</button>
        <div>
          {Array.map((item, index) => {
            return (
              <>
                <p key={index}>
                  {item.id} - {item.name} - {item.email}
                </p>
                <button onClick={() => silmeFonksiyonu(item.id)}>Sil</button>
                <button
                  onClick={() => {
                    setId(item.id);
                    setEmail(item.email);
                    setName(item.name);
                  }}
                >
                  Düzenle
                </button>
              </>
            );
          })}
          <div className="Düzenleme">
            <h3>Düzenleme Bölümü</h3>
            <input value={id} type="hidden" name="" />
            <input
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              type="text"
              placeholder="ismin"
            />
            <input
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              type="text"
              placeholder="mailin"
            />
            <button
              onClick={() => {
                duzenlemeFonksiyonu(id);
              }}
            >
              Düzenle
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
