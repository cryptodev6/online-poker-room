# Dirección cinematográfica — Sección 2

**Libro:** EL JUEGO DETRÁS DEL JUEGO — By Alexander Voss  
**Sección modificada:** `#perspectiva`, exclusivamente.

## Concepto

**Una mesa que cambia sin que lo notes.** La experiencia toma el prólogo definitivo «Una mesa que ya cambió» y lo distribuye en doce beats. La fotografía y el texto avanzan mediante el desplazamiento natural. La escena del river (1.000 sobre 825) es un clímax inmediato, pero el verdadero giro ocurre después del showdown, cuando Daniel descubre que no conservó correctamente la apuesta del turn (250 sobre 325).

## Narrativa integrada

1. 20:30 — Invitación del anfitrión.
2. 21:20 — Llegada y condiciones iniciales 5/10, entrada 3.000, 50/h, sin rake por bote.
3. Primera hora — Observación de tendencias y cena pospuesta.
4. Cerca de 23:30 — Salida de ambos empresarios y reemplazo de asientos.
5. 00:00 — Straddle UTG de 20 y farol mostrado por el nuevo rival.
6. Madrugada — Deterioro sutil de atención.
7. 01:10 — A♣ Q♦ en el botón; apertura del cutoff a 80; call; bote 195.
8. Flop Q♠ 9♠ 4♦ y turn 2♥; apuestas de 65 y 250, botes 325 y 825.
9. River 7♣, apuesta 1.000 y 2.605 detrás de Daniel.
10. Call, showdown 9♥ 9♦ y bote final 2.825.
11. Recuerdo incompleto: 250 sobre 325 en el turn.
12. Revisión de la alineación y de las razones para seguir jugando.

La adaptación **no afirma** que el call fuera necesariamente incorrecto. No incorpora cifras de solver inventadas.

## Dirección visual

- Color cálido sobre fieltro verde, rostros verosímiles, sombras profundas y tipografía serif.
- Panel escénico sticky, con cambios de fotografía por crossfade, sin secuestro de scroll.
- Primer plano del turno recordado y regreso en disolución a la composición de llegada.
- Cartas, palos y cantidades trazados en HTML/CSS, no confiados a texto generado en los fotogramas.
- Biblioteca de **12 composiciones visuales** en `assets/cinematic/`, con 12 versiones específicas para móvil.

### Nota sobre los recursos gráficos

Los archivos de la biblioteca son composiciones y tratamientos visuales a partir de material generado mediante IA y fotografía del proyecto. **No son doce sesiones fotográficas o doce renders independientes de alta resolución nativa**. Algunos planos de detalle proceden de recortes de un storyboard de IA, lo que limita la definición óptica original. Se han normalizado color, encuadre y peso de archivo, pero esa limitación visual persiste. Para una publicación definitiva con estándares cinematográficos máximos conviene reemplazar esos recortes por renders individuales con referencias consistentes de personajes y set, manteniendo los nombres de archivo actuales.

## Código

- `index.html`: único bloque editorial reemplazado: `#perspectiva`.
- `cinematic.css`: estilos namespaced `.film*`.
- `cinematic.js`: motor de escena, interpolación y recuerdos visuales.
- `app.js`: se retiró exclusivamente el controlador obsoleto del antiguo `.dual-scene`.
- `assets/cinematic/*.webp`: 24 assets optimizados.

El resto de las secciones del HTML permanece idéntico a la entrega original (salvo las dos referencias nuevas en `<head>`). La sección siguiente conserva `#temario`.
