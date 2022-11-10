import { useEffect, useState } from "react";
import AdminPageTitle from "../../../components/pages/admin/AdminPageTitle";
import AdminContentBlock from "../../../components/pages/admin/AdminContentBlock";
import { Skill } from "../../../utils/types";
import axios from "axios";

export default function SkillsAdminPage() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [editValue, setEditValue] = useState<Skill>();

  function getSkills() {
    fetch(`${process.env.NEXT_PUBLIC_URL}/data/skills`)
      .then((response) => response.json())
      .then((data) => setSkills(data))
      .catch((rejected) => {
        console.log(rejected);
      });
  }

  useEffect(() => {
    getSkills();
  }, []);

  const editSkill = (id: any) => {
    setEditValue(skills.find((skill) => skill.id === id));
  };

  const saveEditedSkill = (newSkillName: string) => {
    if (newSkillName === editValue!.name) {
      setEditValue(undefined);
      return;
    }

    const editedSkill = { id: editValue!.id, name: newSkillName };

    axios
      .put(
        `${process.env.NEXT_PUBLIC_URL}data/skills/${editValue!.id}`,
        editedSkill
      )
      .then(({ data }) => {
        setEditValue(undefined);
        const updatedSkills = skills.map((skill) => {
          return skill.id === data.id ? data : skill;
        });
        setSkills(updatedSkills);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const deleteSkill = (id: any) => {
    fetch(`${process.env.NEXT_PUBLIC_URL}/data/skills/${id}`, {
      method: "DELETE",
    })
      .then(({ statusText }) => {
        if (statusText === "OK") {
          setSkills(skills.filter((skill) => skill.id != id));
        }
      })
      .catch((rejected) => {
        console.error(rejected);
      });
  };

  return (
    <>
      <AdminPageTitle
        title="Manage Skills"
        buttonLink="/admin/skills/add-skill"
        contentLength={skills.length}
      />
      {skills.map((skill) => {
        return (
          <AdminContentBlock
            key={skill.id}
            content={skill}
            editValue={editValue}
            saveFunction={saveEditedSkill}
            editAction={editSkill}
            deleteFunction={deleteSkill}
          />
        );
      })}
    </>
  );
}
