import { useEffect, useState } from "react";
import { LearnerType } from "../../../utils/types";
import AdminPageTitle from "../../../components/pages/admin/AdminPageTitle";
import AdminContentBlock from "../../../components/pages/admin/AdminContentBlock";

export default function LearnerTypes() {
  const [learnerTypes, setLearnerTypes] = useState<LearnerType[] | []>([]);
  const [editValue, setEditValue] = useState<LearnerType>();

  function getLearnerTypes() {
    fetch(`${process.env.NEXT_PUBLIC_URL}/data/learner-types`)
      .then((response) => response.json())
      .then((data) => setLearnerTypes(data))
      .catch((rejected) => {
        console.error(rejected);
      });
  }

  useEffect(() => {
    getLearnerTypes();
  }, []);

  const editLearnerType = (id: number) => {
    setEditValue(learnerTypes.find((learnerType) => learnerType.id === id));
  };

  const saveEditedLearnerType = (newName: string) => {
    if (newName === editValue!.name) {
      setEditValue(undefined);
    } else {
      fetch(
        `${process.env.NEXT_PUBLIC_URL}/data/learner-types/${editValue!.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: editValue?.id, name: newName }),
        }
      )
        .then((response) => response.json())
        .then((data) => {
          setEditValue(undefined);
          const mappedLearnerTypes = learnerTypes.map((lt) => {
            return lt.id === data.id ? data : lt;
          });
          setLearnerTypes(mappedLearnerTypes);
        })
        .catch((rejected) => {
          console.log(rejected);
        });
    }
  };

  const deleteLearnerType = (id: number) => {
    fetch(`${process.env.NEXT_PUBLIC_URL}/data/learner-types/${id}`, {
      method: "DELETE",
    })
      .then(({ statusText }) => {
        if (statusText === "OK") {
          setLearnerTypes(
            learnerTypes.filter((learnerType) => learnerType.id != id)
          );
        }
      })
      .catch((rejected) => {
        console.error(rejected);
      });
  };

  return (
    <>
      <AdminPageTitle
        title="Handling Statuses"
        buttonLink="/admin/handling-statuses/add"
        contentLength={learnerTypes.length}
      />
      {learnerTypes.map((learnerType: LearnerType) => {
        return (
          <AdminContentBlock
            key={learnerType.id}
            content={learnerType}
            editValue={editValue}
            saveFunction={saveEditedLearnerType}
            editAction={editLearnerType}
            deleteFunction={deleteLearnerType}
          />
        );
      })}
    </>
  );
}
