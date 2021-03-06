import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ClientNavigation from "../ClientHeader/ClientNavigation";
import Footer from "../Footer";
import AnimalsApi from "../../../api/animalsApi";
import LoadingSpinner from "../../../components/UI/LoadingSpinner";
import { Link } from "react-router-dom";

const ExploreDetail = () => {
  const params = useParams();
  const [animalDetail, setAnimalDetail] = useState(null);
  const [relatedAnimal, setRelatedAnimal] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchAnimalDetail = async () => {
      try {
        setIsLoading(true);
        const response = await AnimalsApi.get(params.eid);
        setAnimalDetail(response);
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
      }
    };

    fetchAnimalDetail();
  }, [params.eid]);

  useEffect(() => {
    const fetchAllAnimal = async () => {
      try {
        setIsLoading(true);
        const response = await AnimalsApi.getAll();
        const relatedAnimalArray =
          animalDetail &&
          response.filter((data) => data.family === animalDetail.family);
        // console.log(relatedAnimalArray);

        setRelatedAnimal(relatedAnimalArray);
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
      }
    };
    fetchAllAnimal();
  }, [params.eid]);

  console.log(relatedAnimal);

  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div>
          <ClientNavigation />
          <div className="p-[8%]">
            <div className="mb-10">
              {/* <h1 className="text-2xl font-semibold my-4">
            {animalDetail.localName}
          </h1> */}
              <div className="flex  gap-10 ">
                <div className="w-1/2 ">
                  <img
                    src={animalDetail && animalDetail.media[0].url}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="w-1/2 text-sm">
                  <div>
                    <h1 className="text-xl font-semibold">Ph??n lo???i:</h1>
                    <div className="my-2">
                      <span className="font-bold">T??n khoa h???c : </span>
                      <span> {animalDetail && animalDetail.scienceName}</span>
                    </div>
                    <div className="my-2">
                      <span className="font-bold">T??n ti???ng vi???t :</span>{" "}
                      <span>
                        {" "}
                        {animalDetail && animalDetail.vietnameseName}
                      </span>
                    </div>
                    <div className="my-2">
                      <span className="font-bold">T??n ?????a ph????ng :</span>{" "}
                      <span> {animalDetail && animalDetail.localName}</span>
                    </div>
                    <div className="my-2">
                      <span className="font-bold">?????c ??i???m sinh th??i :</span>{" "}
                      <span>
                        {" "}
                        {animalDetail && animalDetail.ecologicalCharacteristics}
                      </span>
                    </div>
                    <div className="my-2">
                      <span className="font-bold">?????c ??i???m h??nh th??i :</span>{" "}
                      <span>
                        {" "}
                        {animalDetail &&
                          animalDetail.morphologicalCharacteristics}
                      </span>
                    </div>
                    <div className="my-2">
                      <span className="font-bold">Gi?? tr??? s??? d???ng :</span>{" "}
                      <span> {animalDetail && animalDetail.useValue}</span>
                    </div>
                    <div className="my-2">
                      <span className="font-bold">?????a ??i???m :</span>{" "}
                      <span> {animalDetail && animalDetail.place}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {relatedAnimal?.length > 0 && (
              <div>
                <h1>Related spiece</h1>
                <ul className="w-full grid grid-cols-5 gap-4 h-36">
                  {relatedAnimal?.map((item, i) => (
                    <li className="">
                      <Link to={`explore/${item._id}`}>
                        <img
                          src={item.media[0].url}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <Footer />
        </div>
      )}
    </>
  );
};
export default ExploreDetail;
