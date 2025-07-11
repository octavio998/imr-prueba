<?xml version="1.0" encoding="UTF-8"?>
<bpmn:definitions xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" xmlns:di="http://www.omg.org/spec/DD/20100524/DI" targetNamespace="http://bpmn.io/schema/bpmn">
  <bpmn:process id="Process_1" isExecutable="false">
    <bpmn:startEvent id="StartEvent_Caminar" name="Usuario camina por la calle" />
    <bpmn:task id="Task_Caminar" name="Caminar" />
    <bpmn:exclusiveGateway id="Gateway_Decision" name="¿Quiere comprar flores?" />
    <bpmn:task id="Task_ComprarFlores" name="Comprar flores" />
    <bpmn:endEvent id="EndEvent_Fin" name="Fin" />
    <bpmn:sequenceFlow id="Flow_Start_to_Caminar" sourceRef="StartEvent_Caminar" targetRef="Task_Caminar" />
    <bpmn:sequenceFlow id="Flow_Caminar_to_Decision" sourceRef="Task_Caminar" targetRef="Gateway_Decision" />
    <bpmn:sequenceFlow id="Flow_Decision_yes" sourceRef="Gateway_Decision" targetRef="Task_ComprarFlores">
      <bpmn:conditionExpression xsi:type="bpmn:tFormalExpression">"si"</bpmn:conditionExpression>
    </bpmn:sequenceFlow>
    <bpmn:sequenceFlow id="Flow_Decision_no" sourceRef="Gateway_Decision" targetRef="EndEvent_Fin">
      <bpmn:conditionExpression xsi:type="bpmn:tFormalExpression">"no"</bpmn:conditionExpression>
    </bpmn:sequenceFlow>
    <bpmn:sequenceFlow id="Flow_Flores_to_Fin" sourceRef="Task_ComprarFlores" targetRef="EndEvent_Fin" />
  </bpmn:process>
  <bpmndi:BPMNDiagram id="BPMNDiagram_1">
    <bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="Process_1">
      <bpmndi:BPMNShape id="StartEvent_Caminar_di" bpmnElement="StartEvent_Caminar">
        <dc:Bounds x="100" y="100" width="36" height="36" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Task_Caminar_di" bpmnElement="Task_Caminar">
        <dc:Bounds x="150" y="90" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Gateway_Decision_di" bpmnElement="Gateway_Decision">
        <dc:Bounds x="300" y="110" width="50" height="50" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Task_ComprarFlores_di" bpmnElement="Task_ComprarFlores">
        <dc:Bounds x="400" y="90" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="EndEvent_Fin_di" bpmnElement="EndEvent_Fin">
        <dc:Bounds x="550" y="120" width="36" height="36" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNEdge id="Flow_Start_to_Caminar_di" bpmnElement="Flow_Start_to_Caminar">
        <di:waypoint x="136" y="118" />
        <di:waypoint x="150" y="118" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_Caminar_to_Decision_di" bpmnElement="Flow_Caminar_to_Decision">
        <di:waypoint x="250" y="118" />
        <di:waypoint x="300" y="135" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_Decision_yes_di" bpmnElement="Flow_Decision_yes">
        <di:waypoint x="350" y="135" />
        <di:waypoint x="400" y="130" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_Decision_no_di" bpmnElement="Flow_Decision_no">
        <di:waypoint x="325" y="160" />
        <di:waypoint x="550" y="138" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_Flores_to_Fin_di" bpmnElement="Flow_Flores_to_Fin">
        <di:waypoint x="500" y="130" />
        <di:waypoint x="550" y="138" />
      </bpmndi:BPMNEdge>
    </bpmndi:BPMNPlane>
  </bpmndi:BPMNDiagram>
</bpmn:definitions>