import {ReactElement} from 'react';

import CategorySelector from './CategorySelector/CategorySelector';
import CVSelector from './CVSelector/CVSelector';
import ItemEditor from './ItemEditor/ItemEditor';

import { motion } from 'framer-motion';

interface modalProps {
  modalIndex:number,
  toggleModal: (v:number)=>void,
}

/*
TO DO:
  If you click outside modal-content div then should toggle modal state
*/

export default function Modal(props:modalProps) {

  //Display sth based on array index
  const modalInstance:ReactElement[] = [<CVSelector/>, <CategorySelector/>, <ItemEditor/>]

  return (
    <motion.div
      className="h-full w-full flex flex-col justify-center items-center absolute left-0 top-0"
      initial={{ transform: 'scale(0)'}}
      animate={{ transform: 'scale(1)'}}
      exit={{ transform: 'scale(0)'}}
      onClick={()=>props.toggleModal(0)}>
      <div id="modal-content" className="h-5/6 w-5/6 bg-primary rounded-xl">
        {modalInstance[props.modalIndex]}
      </div>
    </motion.div>
  );
}