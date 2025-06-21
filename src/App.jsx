import { useState } from "react";

import ProjectSidebar from "./components/ProjectSidebar";
import NewProject from "./components/NewProject";
import NoProjectSelected from "./components/NoProjectSelected";
import SelectedProject from "./components/SelectedProject";

function App() {
  const [projectState, setProjectState] = useState({
    selectedProjectId: undefined,
    projects: []
  });

  function handleAddTask(text) {
    setProjectState((prevState) => {
      return {
        ...prevState,
        projects: prevState.projects.map(project => {
          if (project.id === prevState.selectedProjectId) {
            return {
              ...project,
              tasks: [...project.tasks, { text, id: Math.random() }]
            };
          }
          return project;
        })
      };
    });
  }

  function handleDeleteTask(id) {
    setProjectState((prevState) => {
      return {
        ...prevState,
        projects: prevState.projects.map(project => {
          if (project.id === prevState.selectedProjectId) {
            project.tasks = project.tasks.filter(task => task.id !== id);
          }
          return project;
        })
      };
    });
  }

  function handleSelectProject(id) {
    setProjectState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: id,
      };
    });
  }

  function handleStartAddProject() {
    setProjectState(prevState => {
      return {
        ...prevState,
        selectedProjectId: null,
      };
    });
  }

  function handleCancelAddProject() {
    setProjectState(prevState => {
      return {
        ...prevState,
        selectedProjectId: undefined,
      };
    });
  }

  function handleAddProject(projectData) {
    setProjectState(prevState => {
      const projectId = Math.random();
      const newProject = {
        ...projectData,
        id: projectId,
        tasks: []
      };

      return {
        ...prevState,
        selectedProjectId: undefined,
        projects: [...prevState.projects, newProject]
      };
    });
  }

  function handleDeleteProject() {
    setProjectState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: undefined,
        projects: prevState.projects.filter(
          (project) => project.id !== prevState.selectedProjectId
        ),
      };
    });
  }

  const selectedProject = projectState.projects.find(project => project.id === projectState.selectedProjectId);

  let content = (
    <SelectedProject
      project={selectedProject}
      onDelete={handleDeleteProject}
      onAddTask={handleAddTask}
      onDeleteTask={handleDeleteTask}
    />
  );

  if (projectState.selectedProjectId === null) {
    content = <NewProject onAdd={handleAddProject} onCancel={handleCancelAddProject} />;
  }
  else if (projectState.selectedProjectId === undefined) {
    content = <NoProjectSelected onStartAddProject={handleStartAddProject} />;
  }

  return (
    <main className="h-screen my-8 flex gap-8">
      <ProjectSidebar onSelectProject={handleSelectProject} onStartAddProject={handleStartAddProject} projects={projectState.projects} selectedProjectId={projectState.selectedProjectId} />
      {content}
    </main>
  );
}

export default App;