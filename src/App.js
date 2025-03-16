import { useEffect, useRef, useState } from "react";


function App() {
  const [loading,setLoading]=useState(true);
  const [element,setElement]=useState(null);
  const [categorie,setCategorie]=useState("");
  const [chaine,setChaine]=useState("");
  const [aux,setAux]=useState(0);
  let ref1=useRef();

  //filtrer par categorie

  function cat(e)
  {  
  setCategorie((prev)=>{
    return e.target.innerText;
  })

  setAux((prev)=>{
    return prev+1
  })

  }


  //recuperation des données
  function recuperer()
  {
    fetch('https://fakestoreapi.com/products/')
    .then(res=>{if(res.ok==false) throw new Error("error in fetching"); return res.json()})
    .then(json=>{setElement(()=>{return json});setLoading(()=>{return false})})
    .catch((err)=>{console.error(err)})
  }

  //composant (cette fois on va filtrer par categorie et valeur saisisée par l'utilisateur)

  function Filtre()
  {
  let  filtr=element;
  const cate=categorie;
  const val=ref1.current.value;

  
  if(cate!=""){
   const fil=element;
   filtr=fil.filter((ele,key)=>{
    return ele.category==cate && ele.description.includes(val);
  })
   }

  



  const ele=filtr.map((element,key)=>{
    return <div className="border-b-black border-b-[2px] w-full mt-[10px] flex flex-wrap min-w-[300px] max-[670px]:mb-[40px]" key={key}>
    <div className="w-[20%] max-[670px]:w-[100%] max-[670px]:text-center max-[670px]:border-b-gray-600 max-[670px]:border-b-[1px]">{element.id}</div>
    <div className="w-[20%] max-[670px]:w-[100%] font-medium text-center max-[670px]:border-b-gray-600 max-[670px]:border-b-[1px]">{element.title}</div>
    <div className="w-[20%] max-[670px]:w-[100%] max-[670px]:text-center max-[670px]:border-b-gray-600 max-[670px]:border-b-[1px] ">{element.description}</div>
    <div className="w-[20%] max-[670px]:w-[100%] max-[670px]:border-b-gray-600 max-[670px]:border-b-[1px] "><img src={element.image} alt="image"  ></img></div>
    <div className="w-[20%] max-[670px]:w-[100%]  text-center font-medium ">{element.category}</div>
   </div>
  })

  return ele;
  }

  //la valeur et la ctagorie saisisées par l'utilisateur


  function envoyer(e)
  {
  e.preventDefault();
  setChaine(()=>{
    return ref1.current.value
  })
  }

  //  apres avoir monté le composant
  useEffect(()=>{
    recuperer();
  },[])

  useEffect(()=>{
    console.log('re-render')
  })



  return (
    <div className=" w-[80%]">
      <h1 className="text-[20px] font-medium">Search:</h1>
      <form action="" className="flex flex-wrap" >
        <div className="flex w-[300px]">
          <label htmlFor="inp" className="w-[80px] shrink-0">Search:</label>
          <input ref={ref1} id="inp" type="text" className="border-[1px] border-gray-500 rounded-[7px] pl-2 box-border min-w-[200px] " style={{width:"calc(100% - 200px)"}} />
        </div>
        <div className=" min-[0px]:ml-[80px] min-[0px]:mt-[10px] min-[702px]:ml-0 min-[702px]:mt-0 flex " style={{width:'calc(100% - 300px)'}}>
          <input type="submit" value="Send" className="bg-black text-white rounded pl-[20px] pr-[20px] ml-[5px] text-[15px] cursor-pointer hover:bg-gray-600 " onClick={envoyer} />
          <input type="reset" value="Reset"  className="bg-gray-400 text-white rounded pl-[20px] pr-[20px] ml-[5px] text-[15px] cursor-pointer hover:bg-gray-300" />
        </div>
      </form>
        <div className=" w-full h-[1px] mt-[10px] bg-gray-400"></div>
        <div className="text-[20px] font-medium mt-[10px]">Categories:</div>
        <div className=" rounded-[10px] mt-[15px] overflow-hidden flex flex-wrap min-w-[300px]">
          <div className="bg-gray-500 w-[25%] h-[45px] flex justify-center items-center text-white hover:bg-slate-300 cursor-pointer max-[670px]:w-[50%]" onClick={cat}>electronics</div>
          <div className="bg-gray-500 w-[25%] h-[45px] text-center flex justify-center items-center text-white hover:bg-slate-300 cursor-pointer max-[670px]:w-[50%]" onClick={cat}>men's clothing</div>
          <div className="bg-gray-500 w-[25%] h-[45px] text-center flex justify-center items-center text-white hover:bg-slate-300 cursor-pointer max-[670px]:w-[50%]" onClick={cat}>women's clothing</div>
          <div className="bg-gray-500 w-[25%] h-[45px] flex justify-center items-center text-white hover:bg-slate-300 cursor-pointer max-[670px]:w-[50%]" onClick={cat}>jewelery</div>
        </div>
        <div className="w-full border-b-gray-500 border-b-[1px] mt-4 flex flex-wrap pb-3 min-w-[300px]">
         <div className="w-[20%] font-medium max-[670px]:w-[100%] max-[670px]:text-center ">#id</div>
         <div className="w-[20%] font-medium text-center max-[670px]:w-[100%]  max-[670px]:text-center">title</div>
         <div className="w-[20%] font-medium text-center max-[670px]:w-[100%]  max-[670px]:text-center">description</div>
         <div className="w-[20%] font-medium text-center max-[670px]:w-[100%]  max-[670px]:text-center">image</div>
         <div className="w-[20%] font-medium text-center max-[670px]:w-[100%]  ">category</div>
        </div>
       {loading==false?<Filtre></Filtre>:<div className="w-full flex justify-center font-medium">Loading...</div>}
    </div>
  );
}

export default App;
