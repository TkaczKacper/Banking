import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useContext, useState } from "react";
import AdoptedPetContext from "./AdoptedPetContext";
import Modal from "./Modal";
import ErrorBoundary from "./ErrorBoundary";
import fetchPet from "./fetchPet";
import Carousel from "./Carousel";

const Details = () => {
     const { id } = useParams();
     const [showModal, setShowModal] = useState(false);
     const navigate = useNavigate();
     const results = useQuery(["details", id], fetchPet);
     // eslint-disable-next-line no-unused-vars
     const [_, setAdoptedPet] = useContext(AdoptedPetContext);

     if (results.isLoading) {
          return (
               <div className="loading-pane">
                    <h2 className="loader">🌀</h2>
               </div>
          );
     }

     const pet = results.data.pets[0];

     return (
          <div className="details">
               <Carousel images={pet.images} />
               <div className="w-100 mt-10 text-center">
                    <h1 className="text-8xl">{pet.name}</h1>
                    <h2 className="text-3xl">{`${pet.animal} — ${pet.breed} — ${pet.city}, ${pet.state}`}</h2>

                    <button
                         className="mt-5 mb-5 rounded border-none bg-orange-300 px-5 py-4"
                         onClick={() => setShowModal(true)}
                    >
                         Adopt {pet.name}
                    </button>
                    <p className="ml-5 mr-5 text-xl sm:mr-20 sm:ml-20 lg:mr-40 lg:ml-40">
                         {pet.description}
                    </p>
                    {showModal ? (
                         <Modal>
                              <div className="align-center absolute h-full w-full bg-gray-700 text-center">
                                   <h1 className="mt-60 align-bottom text-5xl text-white">
                                        Would you like to adopt {pet.name}?
                                   </h1>
                                   <div className="mt-20">
                                        <button
                                             className="mr-5 rounded border-none bg-green-400 px-10 py-4"
                                             onClick={() => {
                                                  setAdoptedPet(pet);
                                                  navigate("/");
                                             }}
                                        >
                                             Yes
                                        </button>
                                        <button
                                             className="ml-5 rounded border-none bg-red-500 px-10 py-4"
                                             onClick={() => setShowModal(false)}
                                        >
                                             No
                                        </button>
                                   </div>
                              </div>
                         </Modal>
                    ) : null}
               </div>
          </div>
     );
};

export default function DetailsErrorBoundary(props) {
     return (
          <ErrorBoundary>
               <Details {...props} />
          </ErrorBoundary>
     );
}
