import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Edit, Trash } from "lucide-react";
import PetForm from '../pet/CreatePets';
import EditPetsForm from '../pet/EditPets';
import usePetStore from '@/src/stores/PetStore';
import useAuthStore from '@/src/stores/AuthStore';
import { toast } from 'react-toastify';



// Table header columns definition
const TABLE_COLUMNS = [
  'No.', 'Image', 'ชื่อ', 'Name', 'สายพันธุ์', 'Breed','คำอธิบาย', 
  'Description', 'Color', 'Date of Birth', 'Gender', 'Status', 'Weight',
  'Neutered', 'Vaccinated', 'Edit', 'Delete'
];

const EditPetDialog = ({ petId }) => {
  const [open, setOpen] = useState(false)
  return (
  <Dialog open={open} onOpenChange={setOpen}>
    <DialogTrigger asChild>
    <button className="h-8 w-8 cursor-pointer hover:text-blue-500">
        <Edit />
        </button>
    </DialogTrigger>
    <DialogContent className="w-[700px] h-[600px] overflow-auto">
      <DialogHeader>
        <DialogTitle>Edit Pets</DialogTitle>
        <DialogDescription>
            Make changes to your pet's information here.
          </DialogDescription>
        <EditPetsForm petId={petId} setOpen={setOpen}/>
      </DialogHeader>
    </DialogContent>
  </Dialog>
  )
}
// Add Pet Dialog Component
const AddPetDialog = () => {
  const [open, setOpen] = useState(false)
  return(
  <Dialog open={open} onOpenChange={setOpen}>
    <DialogTrigger asChild>
    <Button
      className="w-1/5 items-center mx-auto my-5 group relative overflow-hidden bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white font-bold py-3 px-6 rounded-full shadow-lg transition-all duration-300 ease-out hover:scale-105 hover:shadow-xl active:scale-95">
      <span className="relative z-10 flex items-center justify-center gap-3">
        <span className="text-lg">+ Add Pet</span>
      </span>
      <span className="absolute inset-0 z-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100" />
    </Button>
    </DialogTrigger>
    <DialogContent className="w-[700px] h-[600px] overflow-auto">
      <DialogHeader>
        <DialogTitle>Add Pets</DialogTitle>
        <DialogDescription>
            Fill in the details to add a new pet.
          </DialogDescription>
        <PetForm  setOpen={setOpen}/>
      </DialogHeader>
    </DialogContent>
  </Dialog>
);

}

// Pet Table Row Component
const PetTableRow = ({ pet, index,hdlDeletePet }) => (
  <div className="grid grid-cols-[70px_100px_100px_100px_100px_100px_100px_100px_100px_100px_100px_100px_100px_80px_80px_50px_50px] gap-4 border-t p-4 text-sm hover:bg-gray-50 transition-colors duration-150">
    <div className="flex items-center gap-2">
      <div className="text-gray-500">{index + 1}</div>
    </div>
    <div className="flex items-center">
      <img
        className="rounded-lg"
        height="48"
        src={pet.image[0]?.url}
        style={{
          aspectRatio: "48/48",
          objectFit: "cover",
        }}
        width="48"
        alt={pet.name_en}
      />
    </div>
    <div>{pet.name_th}</div>
    <div>{pet.name_en}</div>
    <div>{pet.breed_th}</div>
    <div>{pet.breed_en}</div>
    <div>{pet.description_th}</div>
    <div>{pet.description_en}</div>
    <div>{pet.color}</div>
    <div>{pet.age ? new Date(pet.age).toISOString().split('T')[0].replace(/-/g, '/') : 'N/A'}</div>
    <div>{pet.gender}</div>
    <div>{pet.status}</div>
    <div>{pet.weight != null ? pet.weight.toFixed(2) : 'N/A'}</div>
    <div>{pet.is_neutered != null ? (pet.is_neutered ? 'Yes' : 'No') : 'N/A'}</div>
    <div>{pet.is_vaccinated != null ? (pet.is_vaccinated ? 'Yes' : 'No') : 'N/A'}</div>

    <div className="">
      {/* <button className="h-8 w-8 cursor-pointer hover:text-blue-500"> */}
        <EditPetDialog petId={pet.id}/>
      {/* </button> */}
    </div>
    <div>
    <button className="h-8 w-8 cursor-pointer hover:text-red-500" onClick={() => hdlDeletePet(pet.id)}>
        <Trash />
      </button>
    </div>

  </div>
);


export default function ManagePet() {
  const actionGetAllPets = usePetStore(state => state.actionGetAllPets);
  const actionDeletePet = usePetStore(state => state.actionDeletePet);
  const actionCreatePet = usePetStore(state => state.actionCreatePet);
  const allPets = usePetStore(state => state.allPets);
  const token = useAuthStore(state => state.token);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    actionGetAllPets(token)
  }, []);

  const hdlDeletePet = async (petId) => {
  
      try {
        await actionDeletePet(token, petId);
        toast.success('Pet deleted successfully!');
        actionGetAllPets(token);
      } catch (error) {
        console.error('Error deleting pet:', error);
      }
    }

  return (
    <div className="flex flex-col min-h-screen w-full">
      <AddPetDialog />
      
      <main className="flex-1 space-y-4 p-8 pt-6">
        <div className="rounded-lg border bg-white shadow-md">
          {/* Table Header */}
          <div className="grid grid-cols-[70px_100px_100px_100px_100px_100px_100px_100px_100px_100px_100px_100px_100px_80px_80px_50px_50px] gap-4 p-4 text-sm font-medium text-gray-500">
            {TABLE_COLUMNS.map((column, index) => (
              <div key={index}>{column}</div>
            ))}
          </div>
          
          {/* Table Body */}
          {allPets.map((pet, index) => (
            <PetTableRow key={pet.id} pet={pet} index={index} hdlDeletePet={hdlDeletePet} />
          ))}
        </div>
      </main>
    </div>
  );
}
