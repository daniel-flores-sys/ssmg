import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Settings, ToggleRight, Building2 } from 'lucide-react'
import { MODALIDADES, NOTA_MINIMA_DOCUMENTO, NOTA_MINIMA_FINAL, DIAS_ASIGNACION_TRIBUNAL, DIAS_REVISION_PERFIL, DIAS_CORRECCION, DIAS_PRORROGA_MAX } from '@/utils/constants'

const PARAMETROS = [
  { nombre: 'Nota mínima documento (Grado I)', valor: `${NOTA_MINIMA_DOCUMENTO}/50` },
  { nombre: 'Nota mínima final', valor: `${NOTA_MINIMA_FINAL}/100` },
  { nombre: 'Días hábiles — asignación tribunal', valor: `${DIAS_ASIGNACION_TRIBUNAL} días` },
  { nombre: 'Días hábiles — revisión de perfil', valor: `${DIAS_REVISION_PERFIL} días` },
  { nombre: 'Días hábiles — corrección observaciones', valor: `${DIAS_CORRECCION} días` },
  { nombre: 'Prórroga máxima', valor: `${DIAS_PRORROGA_MAX} días` },
  { nombre: 'Ventana de firma de actas', valor: '1 hora' },
  { nombre: 'Plazo edición de avances', valor: '24 horas' },
]

export default function ConfiguracionPage() {
  return (
    <div className="space-y-4">
      <h2 className="text-base font-semibold">Configuración del Sistema</h2>

      <Tabs defaultValue="parametros">
        <TabsList>
          <TabsTrigger value="parametros">Parámetros</TabsTrigger>
          <TabsTrigger value="modalidades">Modalidades</TabsTrigger>
          <TabsTrigger value="instituciones">Instituciones</TabsTrigger>
        </TabsList>

        <TabsContent value="parametros" className="mt-4">
          <Card>
            <CardHeader className="border-b pb-3">
              <CardTitle className="text-sm flex items-center gap-2"><Settings className="w-4 h-4" />Parámetros generales</CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="space-y-3">
                {PARAMETROS.map((p, i) => (
                  <div key={p.nombre}>
                    <div className="flex items-center justify-between py-1">
                      <span className="text-sm text-muted-foreground">{p.nombre}</span>
                      <span className="text-sm font-medium">{p.valor}</span>
                    </div>
                    {i < PARAMETROS.length - 1 && <Separator />}
                  </div>
                ))}
              </div>
              <p className="text-xs text-muted-foreground mt-4">
                Los cambios en parámetros no son retroactivos. Se aplican desde el momento de guardar.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="modalidades" className="mt-4 space-y-3">
          {Object.entries(MODALIDADES).map(([codigo, nombre]) => (
            <Card key={codigo}>
              <CardContent className="py-4 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">{nombre}</p>
                  <p className="text-xs text-muted-foreground">{codigo}</p>
                </div>
                <Badge variant="default">Habilitada</Badge>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="instituciones" className="mt-4">
          <Card>
            <CardContent className="py-4 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">TechBolivia S.R.L.</p>
                  <p className="text-xs text-muted-foreground">Convenio activo · Cochabamba</p>
                </div>
                <Badge>Activa</Badge>
              </div>
              <Separator />
              <Button size="sm" variant="outline"><Building2 className="w-3 h-3 mr-1" />Agregar institución</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
