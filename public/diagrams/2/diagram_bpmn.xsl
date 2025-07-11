<?xml version="1.0" encoding="UTF-8"?>
<bpmn:definitions xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" xmlns:di="http://www.omg.org/spec/DD/20100524/DI" targetNamespace="http://bpmn.io/schema/bpmn">
  <bpmn:process id="Process_Sell_Shoe" isExecutable="false">
    <bpmn:startEvent id="StartEvent_VendedorVendeZapato" name="Vendedor inicia venta" />
    <bpmn:task id="Task_VenderZapato" name="Vender Zapato" />
    <bpmn:endEvent id="EndEvent_VentaCompleta" name="Venta Completa" />
    <bpmn:sequenceFlow id="Flow_Start_to_Task" sourceRef="StartEvent_VendedorVendeZapato" targetRef="Task_VenderZapato" />
    <bpmn:sequenceFlow id="Flow_Task_to_End" sourceRef="Task_VenderZapato" targetRef="EndEvent_VentaCompleta" />
  </bpmn:process>
  <bpmndi:BPMNDiagram id="BPMNDiagram_VentaZapato">
    <bpmndi:BPMNPlane id="BPMNPlane_VentaZapato" bpmnElement="Process_Sell_Shoe">
      <bpmndi:BPMNShape id="StartEvent_VendedorVendeZapato_di" bpmnElement="StartEvent_VendedorVendeZapato">
        <dc:Bounds x="100" y="100" width="36" height="36" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Task_VenderZapato_di" bpmnElement="Task_VenderZapato">
        <dc:Bounds x="200" y="80" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="EndEvent_VentaCompleta_di" bpmnElement="EndEvent_VentaCompleta">
        <dc:Bounds x="350" y="100" width="36" height="36" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNEdge id="Flow_Start_to_Task_di" bpmnElement="Flow_Start_to_Task">
        <di:waypoint x="136" y="118" />
        <di:waypoint x="200" y="118" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_Task_to_End_di" bpmnElement="Flow_Task_to_End">
        <di:waypoint x="300" y="118" />
        <di:waypoint x="350" y="118" />
      </bpmndi:BPMNEdge>
    </bpmndi:BPMNPlane>
  </bpmndi:BPMNDiagram>
</bpmn:definitions>