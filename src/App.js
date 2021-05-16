import React, {useState, useEffect} from 'react'
import axios from 'axios'
export default function App(){
  const [n, setNum] = useState("")
  const [text , setText] = useState('')
  useEffect(() => {
    axios.get('https://raw.githubusercontent.com/invictustech/test/main/README.md')
    .then(res => {
      setText(res.data)
    }).catch(err => console.log('err' ,err))
  }, [])

  function handleChange(event){
    setNum(event.target.value)
  }

  function wordFreq(string) {
    var words1 = string.replace(/[.,-;]/g, '').toUpperCase().split(/\s/);
    var words = words1.filter(function (el) {
        return el !== '';
      });
    var frequency = {};
    words.forEach(function(i) {
        if (!frequency[i]) {
            frequency[i] = 0;
        }
        frequency[i] += 1;
    });

    return frequency;
}



const array = [{}]
array.push(wordFreq(text));



const array1 = [{}]

for(const item of Object.entries(array[1])) {
  const obj = {
    word:'',
    freq:0
  }
  obj.word = item[0]
  obj.freq = item[1];
  array1.push(obj);
}
function compare( a, b ) {
    if ( a.freq > b.freq ){
      return -1;
    }
    if ( a.freq < b.freq){
      return 1;
    }
    return 0;
}

array1.sort( compare );
var a = [{}]
var num = parseInt(n) + 1
a = array1.slice(0,num);
const TableList = ({word , freq}) => {
   return (
     <tr>
       <td>{word}</td>
       <td>{freq}</td>
      </tr>
   )
}

  return(
    <div>
      <input onChange={handleChange} type="text"/>
      <br />
      <br />
      <table>
        <tr id="header">
        <th>Word</th>
        <th>Freq</th>
      </tr>
      {a.map((item , index) => (<TableList word={item.word} key={index.toString()} freq={item.freq} />))}
      </table>
    </div>
  )

}
