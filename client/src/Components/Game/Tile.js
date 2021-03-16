import InsertEmoticon from '@material-ui/icons/InsertEmoticon';
import Card from '@material-ui/core/Card';

export default function Tile({number, color}){
    return <Card className={tileClassname(color)}>
          {  number > 0 ? <span>{number}</span> 
                        : <span><InsertEmoticon /></span>
          }
    </Card>
}

function tileClassname(color){
    
}