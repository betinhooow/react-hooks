import React, { useState, useEffect } from 'react';

export default function App(){
  const [repositories, setRepositories] = useState([]);

  useEffect(async () => {
    const response = await fetch('https://api.github.com/users/robertonobre/repos');
    const data = await response.json();
    setRepositories(data);
  }, []);

  useEffect(() => {
    const filtered =  repositories.filter(item => item.favorite);
    document.title = `Você tem ${filtered.length} favoritos.`;
  }, [repositories]);

  function handleFavorite(id){
    const reps = repositories.map(item => 
      item.id == id ? { ...item, favorite: !item.favorite} : item);

    setRepositories(reps);
  }

  function handleEdit(id){
    const reps = repositories.map(item =>
      item.id == id ? { ...item, isEdit: !item.isEdit } : item);

    setRepositories(reps);
  }

  function handleText(e, id){
    const reps = repositories.map(item =>
      item.id == id ? { ...item, name: e.target.value } : item);
    setRepositories(reps);
  }

  return (
    <>
      <table>
        <tr>
          <td><b>Repository name</b></td>
        </tr>
        {repositories.map(item => 
          <tr key={item.id}>
            <td>
              {item.isEdit ? 
                <input 
                  type="text" 
                  name="repo" 
                  value={item.name} 
                  onChange={(e) => handleText(e, item.id)}/> 
                : item.name} {item.favorite && <span>(Favorito) </span>}
            </td>
            <td>
              <button 
                onClick={() => handleEdit(item.id)}>
                {!item.isEdit ? `Edit` : `Save`}
              </button>
            </td>
            <td>
              <button onClick={() => handleFavorite(item.id)}>Favoritar</button>
            </td>
          </tr>
          )}
      </table>
    </>
  );
}
