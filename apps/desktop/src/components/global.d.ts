// global.d.ts
export {}

declare global {
  interface Window {
    electronAPI: {
        guardarAsignaturaJSON: (
            filename: string,
            data: any
          ) => Promise<{ success: boolean; error?: string }>          
      leerAsignaturasLocales: () => Promise<any>
      guardarAlumno: (
        alumno: { nombre: string; curso: string }
      ) => Promise<{ success: boolean; error?: string }>
      
    }
  }
}
